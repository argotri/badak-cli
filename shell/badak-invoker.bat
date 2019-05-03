@echo off

:: Check Env BADAK_INVOKER_HOME already set or not
set badak_home=%BADAK_INVOKER_HOME%
if "%badak_home%"=="" (
	echo you need to set BADAK_INVOKER_HOME env variables
	exit /b 1
)


:: check java already run well
echo Checking Java
java -version
if errorlevel 1 (
   echo You need to setup the java to run this command
   exit /b %errorlevel%
)

:: get current directory 
set basedir=--basedir="%cd%"
echo %basedir%

:: if no args specified, will call --help command
if "%*"=="" (
	java -jar %badak_home%\invoker.jar --help
	exit /b 0
)


:: running command
set command=java -jar %badak_home%\invoker.jar %* %basedir%
echo running %command%
%command%

:: checking the result of execution
if errorlevel 1 (
   echo Failed to execute the program, please check the argument parameter or your automation project
   echo please check "badak-invoker --help" for the argument parameter
   exit /b %errorlevel%
)