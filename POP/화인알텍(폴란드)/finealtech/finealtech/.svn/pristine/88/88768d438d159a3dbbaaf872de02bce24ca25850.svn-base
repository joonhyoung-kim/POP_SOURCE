using DevExpress.Mvvm;
using DevExpress.Mvvm.Native;
using DevExpress.Mvvm.UI;
using DevExpress.Xpf.Core;
using DevExpress.Xpf.WindowsUI;
using MOM.RPT.Modules.Interfaces;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Data;
using System.IO;
using System.Linq;
using System.Windows;
using System.Windows.Input;
using TU.Core;
using TU.Core.Helpers;
using TU.Core.Interfaces;
using TU.Core.Logging;
using TU.Core.Models;
using TU.Core.Transfer;

namespace MOM.RPT.Modules
{
    /// <summary>
    /// MAINWINDOW SERVICE
    /// </summary>
    public class MainWindowService : ServiceBase, IAppService
    {
        #region MAIN SERVICES
        public IApp App => MAIN as IApp;

        public IMainWindow MAIN => Application.Current.MainWindow as IMainWindow;
        public ILogService LOGSERVICE => new LogService();


        #endregion

        private TViewModelBase ViewModel => Application.Current.MainWindow.DataContext as TViewModelBase;

        public ICommand ExitCommand => new TUCommand
        {
            ExecuteDelegate = o => Shutdown(null)
        };

        public string Title
        {
            get { return Application.Current.With(a => a.MainWindow).With(w => w.Title); }
            set { Application.Current.With(a => a.MainWindow).Do(w => w.Title = value); }
        }


        public void AppStart()
        {
            bool auto_Exit = true;
            try
            {
                LOGSERVICE.Warn(LoggingCategory.COMMON, $"RPT.exe Start");
                // 변환 실패 시 시스템id로 다시 읽기 시도
                XMLConfigHelper_UserConfig.LoadAppSetting(Application.Current.MainWindow.Tag.ToString());

                if (LoginUser.Instance.MOMConfig.Parameter.ContainsKey("REPORT_MODE"))
                {
                    if ("DESIGN".Equals(LoginUser.Instance.MOMConfig.Parameter["REPORT_MODE"]))
                    {
                        DXSplashScreen.Close();
                        // 종료하지 않도록 조치.
                        auto_Exit = false;
                        TU.Core.Helpers.DispatcherHelper.Invoker(() =>
                        {
                            System.Threading.Thread.Sleep(1000);
                            // 인쇄모듈 시작
                            (MAIN?.MAINWINDOW.DataContext as TViewModelBase).FrameNavigation("RPT_01View");

                        });
                        return;
                    }
                }

                // 인쇄모드 ( 화면을 숨긴다 )
                Application.Current.MainWindow.Hide();

                string path = LoginUser.Instance.MOMConfig.Parameter["REPORT_DIR"].ToString();
                LOGSERVICE.Warn(LoggingCategory.COMMON, $"path : {path}");

                DirectoryInfo dir = new DirectoryInfo(path);
                LOGSERVICE.Warn(LoggingCategory.COMMON, $"dir FullName: {dir.FullName.ToString()}");

                if (!dir.Exists)
                {
                    LOGSERVICE.Warn(LoggingCategory.COMMON, $"dir.Exists : {dir.Exists}");
                    return;
                }



                // json 파일 찾기
                FileInfo[] files = dir.GetFiles("*.json");
                if (files.Length < 1)
                {
                    return;
                }

                LOGSERVICE.Warn(LoggingCategory.COMMON, $"json File. { files.First().FullName }");

                // json파일 열기
                FileInfo file = files.First();
                string json = File.ReadAllText(file.FullName);

                TResponse result = ParseHelper.ParseJSON<TResponse>(json) as TResponse;
                if (result == null)
                {
                    return;
                }

                Collection<Dictionary<string, object>> report = ParseHelper.DataParse(result);
                if (report.Count < 1)
                {
                    return;
                }

                Dictionary<string, object> dic = report[0];

                string filePath = ParseHelper.Parse(dic, "REPORTFILE");
                string printerName = ParseHelper.Parse(dic, "PRINTERNAME");

                LOGSERVICE.Warn(LoggingCategory.COMMON, $"filePath. { filePath }");
                LOGSERVICE.Warn(LoggingCategory.COMMON, $"printerName. { printerName }");

                // 인쇄 시작
                MAIN.REPORTPRINTSERVICE.FilePrint(filePath, report, printerName);

            }
            catch (ExceptionItem ei)
            {
                LOGSERVICE.Warn(LoggingCategory.EXCEPTION, ei);
            }
            catch (Exception e)
            {
                LOGSERVICE.Warn(LoggingCategory.EXCEPTION, e);
            }
            finally
            {
                // 인쇄 종료 후 Application 종료여부
                if (auto_Exit)
                {
                    Environment.Exit(Environment.ExitCode);
                }
            }

        }

        public void Example()
        {
            bool auto_Exit = true;
            try
            {
                // 변환 실패 시 시스템id로 다시 읽기 시도
                XMLConfigHelper_UserConfig.LoadAppSetting(Application.Current.MainWindow.Tag.ToString());

                if (LoginUser.Instance.MOMConfig.Parameter.ContainsKey("REPORT_MODE"))
                {
                    if ("DESIGN".Equals(LoginUser.Instance.MOMConfig.Parameter["REPORT_MODE"]))
                    {
                        DXSplashScreen.Close();
                        // 종료하지 않도록 조치.
                        auto_Exit = false;
                        TU.Core.Helpers.DispatcherHelper.Invoker(() =>
                        {
                            System.Threading.Thread.Sleep(1000);
                            // 인쇄모듈 시작
                            (MAIN?.MAINWINDOW.DataContext as TViewModelBase).FrameNavigation("RPT_01View");

                        });
                        return;
                    }
                }

                // 인쇄모드 ( 화면을 숨긴다 )
                Application.Current.MainWindow.Hide();

                string path = LoginUser.Instance.MOMConfig.Parameter["REPORT_DIR"].ToString();

                DirectoryInfo dir = new DirectoryInfo(path);
                if (!dir.Exists)
                {
                    return;
                }

                string json_temp = MakeJson();

                // json 파일 찾기
                FileInfo[] files = dir.GetFiles("*.json");
                if (files.Length < 1)
                {
                    return;
                }

                // json파일 열기
                FileInfo file = files.First();
                string json = File.ReadAllText(file.FullName);

                TResponse result = ParseHelper.ParseJSON<TResponse>(json) as TResponse;
                if (result == null)
                {
                    return;
                }

                Collection<Dictionary<string, object>> report = ParseHelper.DataParse(result);
                if (report.Count < 1)
                {
                    return;
                }

                Dictionary<string, object> dic = report[0];

                string filePath = ParseHelper.Parse(dic, "REPORT_FILE");
                string printerName = ParseHelper.Parse(dic, "PRINTER_NAME");

                // 인쇄 시작
                MAIN.REPORTPRINTSERVICE.FilePrint(filePath, report, printerName);

            }
            finally
            {
                // 인쇄 종료 후 Application 종료여부
                if (auto_Exit)
                {
                    Environment.Exit(Environment.ExitCode);
                }
            }

        }

        private string MakeJson()
        {
            DataTable dt = new DataTable("OUT_CUR0");
            dt.Columns.Add("REPORTFILE");
            dt.Columns.Add("PRINTERNAME");
            dt.Columns.Add("COLUMN1");
            dt.Columns.Add("COLUMN2", typeof(int));
            dt.Columns.Add("COLUMN3", typeof(float));
            dt.Columns.Add("COLUMN4");
            dt.Columns.Add("COLUMN5");

            DataRow dr = dt.NewRow();
            dr["REPORTFILE"] = "./report/test.repx";
            dr["PRINTERNAME"] = "";
            dr["COLUMN1"] = "TEXT1";
            dr["COLUMN2"] = 1111;
            dr["COLUMN3"] = 11.11;
            dr["COLUMN4"] = "TEXT2";
            dr["COLUMN5"] = "TEXT3";

            dt.Rows.Add(dr);

            TResponse response = ParseHelper.ConvertResponse(dt);
            return ParseHelper.GenerateJson(response);
        }

        /// <summary>
        /// ApplicationMenu Show
        /// </summary>
        public void ShowApplicationMenu()
        {

        }

        /// <summary>
        /// NotifyIcon 초기화
        /// </summary>
        public void InitNotifyIcon()
        {


        }

        public void Shutdown(CancelEventArgs e)
        {
            if (Confirmation(new MessageItem(LoginUser.Instance.MOMConfig.System, "MAINWINDOWSERVICE_EXIT")))
            {
                Environment.Exit(Environment.ExitCode);
                return;
            }
            if (e != null)
            {
                e.Cancel = true;
            }
        }
        /// <summary>
        /// 시작화면
        /// </summary>
        public void StartView()
        {

        }

        /// <summary>
        /// 로그인 성공 시 
        /// </summary>
        public void UserLoginCompleted()
        {

        }

        #region Notification

        /// <summary>
        /// 메시지 표시
        /// </summary>
        /// <param name="o"></param>
        public async void Notification(Exception ex, Action<NotificationResult> action = null)
        {
            ExceptionItem ei = ex as ExceptionItem;
            if (ei == null)
            {
                ei = new ExceptionItem(ex);
            }

            INotification notification = MAIN.NotificationService.CreatePredefinedNotification(LoginUser.Instance.MOMConfig.System, ei.Result, ei.StackTrace, null);
            NotificationResult result = await notification.ShowAsync();

            if (action != null)
            {
                action(result);
            }
        }

        /// <summary>
        /// 메시지 표시
        /// </summary>
        /// <param name="o"></param>
        public async void Notification(Exception ex, object viewModel, Action<NotificationResult, object> action = null)
        {
            ExceptionItem ei = ex as ExceptionItem;
            if (ei == null)
            {
                ei = new ExceptionItem(ex);
            }

            INotification notification = MAIN.NotificationService.CreatePredefinedNotification(LoginUser.Instance.MOMConfig.System, ei.Result, ei.StackTrace, null);
            NotificationResult result = await notification.ShowAsync();

            if (action != null)
            {
                action(result, viewModel);
            }
        }
        /// <summary>
        /// 메시지 표시
        /// </summary>
        /// <param name="o"></param>
        public async void Notification(string title, string message, string detail, Action<NotificationResult> action = null)
        {
            INotification notification = MAIN.NotificationService.CreatePredefinedNotification(title, message, detail, null);
            NotificationResult result = await notification.ShowAsync();

            if (action != null)
            {
                action(result);
            }
        }

        /// <summary>
        /// 메시지 표시
        /// </summary>
        /// <param name="o"></param>
        public async void Notification(string title, string message, string detail, object viewModel, Action<NotificationResult, object> action = null)
        {
            INotification notification = MAIN.NotificationService.CreatePredefinedNotification(title, message, detail, null);
            NotificationResult result = await notification.ShowAsync();

            if (action != null)
            {
                action(result, viewModel);
            }
        }

        /// <summary>
        /// 메시지 표시
        /// </summary>
        /// <param name="o"></param>
        public bool Confirmation(MessageItem item)
        {
            MessageBoxImage image = MessageBoxImage.Question;
            return WinUIMessageBox.Show(
                    Window.GetWindow(Application.Current.MainWindow),
                    string.Format(TranslationManager.Instance[item.MessageKey], item.Parameters),
                    item.Title,
                    MessageBoxButton.YesNo,
                    image,
                    MessageBoxResult.None,
                    MessageBoxOptions.None,
                    DevExpress.Xpf.Core.FloatingMode.Adorner
                    ) == MessageBoxResult.Yes;
        }

        #endregion

        #region Exception

        /// <summary>
        /// Exception
        /// </summary>
        /// <param name="ei"></param>
        public void PopupExceptionItem(ExceptionItem ei, Action<MessageBoxResult> action = null)
        {

            MessageBoxImage image = MessageBoxImage.Error;
            switch (ei.MessageType)
            {
                case TU.Core.Enums.MESSAGETYPE.ERROR:
                    image = MessageBoxImage.Error;
                    break;
                case TU.Core.Enums.MESSAGETYPE.INFOMATION:
                    image = MessageBoxImage.Information;
                    break;
                case TU.Core.Enums.MESSAGETYPE.WARNING:
                    image = MessageBoxImage.Warning;
                    break;
                case TU.Core.Enums.MESSAGETYPE.QUESTION:
                    image = MessageBoxImage.Question;
                    break;
                default:
                    image = MessageBoxImage.Stop;
                    break;
            }

            MessageBoxResult result = WinUIMessageBox.Show(
                    Window.GetWindow(Application.Current.MainWindow),
                    ei.Result,
                    $"{ ei.MessageType } - { ei.ErrorCode}",
                    MessageBoxButton.OK,
                    image,
                    MessageBoxResult.None,
                    MessageBoxOptions.None,
                    DevExpress.Xpf.Core.FloatingMode.Adorner,
                    true
                    );

            if (action != null)
            {
                action(result);
            }
        }
        /// <summary>
        /// Exception
        /// </summary>
        /// <param name="ex"></param>
        public void PopupException(Exception ex, Action<MessageBoxResult> action = null)
        {
            ExceptionItem ei = ex as ExceptionItem;
            if (ei == null)
            {
                ei = new ExceptionItem(ex);
            }
            PopupExceptionItem(ei, action);
        }

        public void ShowMessage(string errorCode, params string[] para)
        {
            WinUIMessageBox.Show(
                    Window.GetWindow(Application.Current.MainWindow),
                    string.Format(TranslationManager.Instance[errorCode], para),
                    $"{errorCode}",
                    MessageBoxButton.OK,
                    MessageBoxImage.Information,
                    MessageBoxResult.None,
                    MessageBoxOptions.None,
                    DevExpress.Xpf.Core.FloatingMode.Adorner,
                    true
                    );
        }
        public void ShowMessage(Action<MessageBoxResult> action, string errorCode, params string[] para)
        {
            MessageBoxResult result = WinUIMessageBox.Show(
                    Window.GetWindow(Application.Current.MainWindow),
                    string.Format(TranslationManager.Instance[errorCode], para),
                    $"{errorCode}",
                    MessageBoxButton.OK,
                    MessageBoxImage.Information,
                    MessageBoxResult.None,
                    MessageBoxOptions.None,
                    DevExpress.Xpf.Core.FloatingMode.Adorner,
                    true
                    );

            if (action != null)
            {
                action(result);
            }
        }

        #endregion

    }
}