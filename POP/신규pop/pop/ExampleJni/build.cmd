@echo off
if not exist target mkdir target
if not exist target\classes mkdir target\classes


echo compile classes
javac -nowarn -d target\classes -sourcepath jvm -cp "c:\users\user\desktop\pop(援�)\�떊洹쐏op\pop\examplejni\jni4net\lib\jni4net.j-0.8.8.0.jar"; "jvm\zebraprinting\ICallClass.java" "jvm\zebraprinting\ICallClass_.java" "jvm\zebraprinting\Class2.java" 
IF %ERRORLEVEL% NEQ 0 goto end


echo Zebraprinting.j4n.jar 
jar cvf Zebraprinting.j4n.jar  -C target\classes "zebraprinting\ICallClass.class"  -C target\classes "zebraprinting\ICallClass_.class"  -C target\classes "zebraprinting\__ICallClass.class"  -C target\classes "zebraprinting\Class2.class"  > nul 
IF %ERRORLEVEL% NEQ 0 goto end


echo Zebraprinting.j4n.dll 
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc /nologo /warn:0 /t:library /out:Zebraprinting.j4n.dll /recurse:clr\*.cs  /reference:"C:\Users\USER\Desktop\POP(援�)\�떊洹쐏op\pop\ExampleJni\Zebraprinting.dll" /reference:"C:\Users\USER\Desktop\POP(援�)\�떊洹쐏op\pop\ExampleJni\jni4net\lib\jni4net.n-0.8.8.0.dll"
IF %ERRORLEVEL% NEQ 0 goto end


:end
