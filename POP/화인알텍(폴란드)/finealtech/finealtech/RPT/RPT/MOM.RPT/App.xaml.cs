using System;
using System.IO;
using System.Windows;
using DevExpress.Xpf.Core;
using log4net.Config;
using TU.Core;
using TU.Launcher.Helpers;
using TU.Launcher.Interfaces;
using TU.Launcher.Logging;

[assembly: log4net.Config.XmlConfigurator(Watch = true)]

namespace MOM.RPT
{
    /// <summary>
    /// App.xaml에 대한 상호 작용 논리
    /// </summary>
    public partial class App : Application
    {

        private readonly ILogService LOGSERVICE = new LogService();

        protected override void OnStartup(StartupEventArgs e)
        {
            string system = System.Windows.Application.ResourceAssembly.GetName().Name;

            bool desktop = false;
            bool startup = false;
            bool debugFlag = true;

            // 중복 실행 방지
            if (RunOnceHelper.Check(system, desktop, startup, debugFlag))
            {
                MessageBox.Show("Already Run.");
                Environment.Exit(Environment.ExitCode);
                return;
            }

            LauncherManager launcher = new LauncherManager(LOGSERVICE);


            FileInfo logfile = new FileInfo($"{ RunOnceHelper.WORKING_DIRECTORY }\\{ system }_log4net.config");
            if (!logfile.Exists)
            {
                MessageBox.Show($"not found { system }_log4net.config");
                Environment.Exit(Environment.ExitCode);
                return;
            }
            XmlConfigurator.Configure(logfile);

            DXSplashScreen.Show<SplashScreenView1>();

            Application.Current.MainWindow = launcher.Execute(system, debugFlag);
            if (Application.Current.MainWindow == null)
            {
                DXSplashScreen.Close();
                Environment.Exit(Environment.ExitCode);
                return;
            }

            Application.Current.MainWindow.Show();
            base.OnStartup(e);
        }
    }
}
