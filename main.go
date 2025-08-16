package main

import (
	"fmt"
	"log"
	"time"

	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/host"
	"github.com/shirou/gopsutil/mem"
	"github.com/shirou/gopsutil/net"
)

func collectSystemInfo() {
	// 获取操作系统信息
	hostInfo, err := host.Info()
	if err != nil {
		log.Printf("Error getting host info: %v\n", err)
	} else {
		fmt.Printf("OS: %s %s (%s)\n", hostInfo.Platform, hostInfo.PlatformVersion, hostInfo.KernelVersion)
	}

	// 获取CPU使用情况
	cpuPercent, err := cpu.Percent(0, false)
	if err != nil {
		log.Printf("Error getting CPU usage: %v\n", err)
	} else {
		fmt.Printf("CPU Usage: %.2f%%\n", cpuPercent[0])
	}

	// 获取内存使用情况
	memInfo, err := mem.VirtualMemory()
	if err != nil {
		log.Printf("Error getting memory info: %v\n", err)
	} else {
		fmt.Printf("Memory: Total: %.2f GB, Used: %.2f GB, Free: %.2f GB, Usage: %.2f%%\n",
			float64(memInfo.Total)/1e9, float64(memInfo.Used)/1e9, float64(memInfo.Free)/1e9, memInfo.UsedPercent)
	}

	// 获取磁盘使用情况
	diskInfo, err := disk.Usage("/")
	if err != nil {
		log.Printf("Error getting disk info: %v\n", err)
	} else {
		fmt.Printf("Disk: Total: %.2f GB, Used: %.2f GB, Free: %.2f GB, Usage: %.2f%%\n",
			float64(diskInfo.Total)/1e9, float64(diskInfo.Used)/1e9, float64(diskInfo.Free)/1e9, diskInfo.UsedPercent)
	}

	// 获取网络使用情况
	netInfo, err := net.IOCounters(false)
	if err != nil {
		log.Printf("Error getting network info: %v\n", err)
	} else {
		for _, nic := range netInfo {
			fmt.Printf("Network (%s): Bytes Sent: %.2f MB, Bytes Received: %.2f MB\n",
				nic.Name, float64(nic.BytesSent)/1e6, float64(nic.BytesRecv)/1e6)
		}
	}
}

func main() {
	// 定时采集数据
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			fmt.Println("Collecting system info...")
			collectSystemInfo()
			fmt.Println()
		}
	}
}
