# Overview
Simple Node.js application to demonstrate the use of GitHub Actions

# Look Ma, no Makefile!
All the tasks necessary for testing, building and deploying this code is already defined in `.github/workflows/` so why would you want to also create a `Makefile` for local development?  Now you can use [act](https://github.com/nektos/act) to run the actions locally!

Try these:
- export GOPROXY=https://mirrors.aliyun.com/goproxy/
- git config --global user.email drawnkid@gmail.com
- git config --global user.name "James"
* `act -j test` - run the tests
* `act` - run the the entire pipeline
* `act -l` - view the execution graph
- git config --global http.proxy 
- git config --global https.proxy 
- git config --global http.proxy http://127.0.0.1:12334
- git config --global https.proxy http://127.0.0.1:12334
