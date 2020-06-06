// *********************************************************************************************************
// **  class: MainWindowViewModel.cs
// **  description: MainWindowViewModel ViewModel
// **  writer: 티라유텍 전진근 책임
// **  date : 2019.02.08 1차 작성
// *********************************************************************************************************
// ** 
// *********************************************************************************************************

using DevExpress.Mvvm;
using System;
using System.Threading;
using System.Windows;
using TU.Core;

namespace MOM.RPT.Modules
{

    public class MainWindowViewModel : TViewModelBase
    {

        DevExpress.Mvvm.ISplashScreenService SplashScreenService => MainWindow?.SplashScreenService;

        public System.Windows.Input.ICommand ShowSplashScreenCommand { get; set; }

        private WindowStyle _windowStyle = WindowStyle.ToolWindow;
        public WindowStyle WINDOWSTYLE
        {
            get { return _windowStyle; }
            set { SetProperty(ref _windowStyle, value); }
        }

        private WindowState _windowState = WindowState.Maximized;
        public WindowState WINDOWSTATE
        {
            get { return _windowState; }
            set { SetProperty(ref _windowState, value); }
        }

        private ResizeMode _resizeMode = ResizeMode.CanResize;
        public ResizeMode RESIZEMODE
        {
            get { return _resizeMode; }
            set { SetProperty(ref _resizeMode, value); }
        }

        private string _title = "";
        public string TITLE
        {
            get { return _title; }
            set { SetProperty(ref _title, value); }
        }

        public MainWindowViewModel() : base()
        {

        }

        protected override void UIInitializeComponent()
        {
            ShowSplashScreenCommand = new TUCommand
            {
                ExecuteDelegate = o => OnShowSplashScreenCommandExecute()
            };

        }

        public override void UIClear()
        {
            
        }

        public override void UIRefresh()
        {
            
        }
        private void OnShowSplashScreenCommandExecute()
        {

            if (!SplashScreenService.IsSplashScreenActive)
            {

                SplashScreenService.ShowSplashScreen();

                Thread.Sleep(TimeSpan.FromSeconds(3));
                SplashScreenService.HideSplashScreen();

            }

        }

        public override void UINavigated()
        {
            
        }

        private void NotifyIconClick(object o)
        {

        }

        private void NotifyIconDBClick(object o)
        {

        }

        private void ContextMenu()
        {

        }
    }
    
}
