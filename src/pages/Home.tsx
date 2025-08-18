import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type WeatherCondition = 'sun' | 'cloud' | 'rain' | 'snow' | 'thunder';

interface CurrentWeather {
  city: string;
  temp: number;
  condition: WeatherCondition;
  icon: string;
  windSpeed: number;
  humidity: number;
  pressure: number;
}

interface ForecastDay {
  date: string;
  highTemp: number;
  lowTemp: number;
  condition: WeatherCondition;
  icon: string;
}

const mockCurrentWeather: CurrentWeather = {
  city: "北京",
  temp: 25,
  condition: "sun",
  icon: "sun",
  windSpeed: 12,
  humidity: 45,
  pressure: 1012
};

const mockForecast: ForecastDay[] = [
  { date: "周一 6/10", highTemp: 28, lowTemp: 18, condition: "sun", icon: "sun" },
  { date: "周二 6/11", highTemp: 26, lowTemp: 19, condition: "cloud", icon: "cloud" },
  { date: "周三 6/12", highTemp: 24, lowTemp: 17, condition: "rain", icon: "rain" },
  { date: "周四 6/13", highTemp: 27, lowTemp: 20, condition: "sun", icon: "sun" },
  { date: "周五 6/14", highTemp: 29, lowTemp: 21, condition: "sun", icon: "sun" },
  { date: "周六 6/15", highTemp: 25, lowTemp: 19, condition: "cloud", icon: "cloud" },
  { date: "周日 6/16", highTemp: 23, lowTemp: 18, condition: "rain", icon: "rain" }
];

const cities = ["北京", "上海", "广州", "深圳", "成都", "杭州", "武汉", "西安", "南京", "重庆"];

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>(mockCurrentWeather);
  const [forecast, setForecast] = useState<ForecastDay[]>(mockForecast);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  useEffect(() => {
    // 尝试自动定位
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.success('定位成功');
          // 这里实际应用中会调用API获取天气数据
          setCurrentWeather({
            ...mockCurrentWeather,
            city: '当前位置'
          });
        },
        (error) => {
          toast.error('无法获取位置信息');
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      setFilteredCities(
        cities.filter(city =>
          city.toLowerCase().includes(query.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setSearchQuery(city);
    setShowSuggestions(false);
    // 这里实际应用中会调用API获取天气数据
    setCurrentWeather({
      ...mockCurrentWeather,
      city
    });
    toast.success(`已切换至${city}的天气`);
  };

  const getWeatherIcon = (condition: WeatherCondition) => {
    switch (condition) {
      case 'sun':
        return <i className="fa-solid fa-sun text-yellow-400"></i>;
      case 'cloud':
        return <i className="fa-solid fa-cloud text-gray-400"></i>;
      case 'rain':
        return <i className="fa-solid fa-cloud-rain text-blue-400"></i>;
      case 'snow':
        return <i className="fa-solid fa-snowflake text-blue-100"></i>;
      case 'thunder':
        return <i className="fa-solid fa-bolt text-yellow-500"></i>;
      default:
        return <i className="fa-solid fa-sun text-yellow-400"></i>;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 顶部导航栏 */}
      <header className="bg-sky-300 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">天气应用</h1>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="搜索城市..."
              className="w-64 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showSuggestions && filteredCities.length > 0 && (
              <ul className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredCities.map((city) => (
                  <li
                    key={city}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* 主天气面板 */}
      <main className="flex-grow container mx-auto p-6">
        <div className="bg-sky-100 rounded-xl p-8 shadow-lg mb-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-semibold mb-4">{currentWeather.city}</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="text-7xl font-bold mr-4">{currentWeather.temp}°</div>
              <div className="text-6xl">
                {getWeatherIcon(currentWeather.condition)}
              </div>
            </div>
            <div className="text-xl capitalize mb-2">{currentWeather.condition}</div>
            <div className="grid grid-cols-3 gap-4 text-center text-gray-600">
              <div>
                <i className="fa-solid fa-wind mr-2"></i>
                {currentWeather.windSpeed} km/h
              </div>
              <div>
                <i className="fa-solid fa-droplet mr-2"></i>
                {currentWeather.humidity}%
              </div>
              <div>
                <i className="fa-solid fa-gauge-high mr-2"></i>
                {currentWeather.pressure} hPa
              </div>
            </div>
          </div>
        </div>

        {/* 7天天气预报 */}
        <h3 className="text-2xl font-semibold mb-4">7天预报</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow",
                index === 0 ? "border-2 border-blue-400" : ""
              )}
            >
              <div className="text-center">
                <div className="font-medium mb-2">{day.date}</div>
                <div className="text-4xl mb-2">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="flex justify-between">
                  <span className="text-red-500">{day.highTemp}°</span>
                  <span className="text-blue-500">{day.lowTemp}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 底部页脚 */}
      <footer className="bg-sky-300 p-4 text-center text-white">
        <p>© 2025 天气应用 - 提供准确的天气信息</p>
      </footer>
    </div>
  );
}