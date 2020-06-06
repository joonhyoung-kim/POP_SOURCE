using DevExpress.Mvvm;
using DevExpress.Mvvm.POCO;
using DevExpress.Xpf.Core;
using DevExpress.Xpf.WindowsUI;
using MOM.RPT.Modules.Interfaces;
using System.Windows;
using TU.Core.Interfaces;

namespace MOM.RPT.Modules
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : IApp
    {

        public MainWindow()
        {
            InitializeComponent();

            Loaded += ((o, args) =>
           {
               MAINWINDOWSERVICE.AppStart();
           });


            Closing += ((o, args) =>
            {
                // 종료하시겠습니까?
                MAINWINDOWSERVICE.Shutdown(args);
            });
        }

        public Window MAINWINDOW => Application.Current.MainWindow;

        public MainWindowViewModel MainDataContext => Application.Current.MainWindow.DataContext as MainWindowViewModel;


        public object RibbonView => ribbon;
        public RibbonViewModel RibbonDataContext => ribbon.DataContext as RibbonViewModel;


        #region MainWindow
        public IMainWindowNotifyIconService MAINWINDOWNOTIFYICONSERVICE => MainDataContext.GetService<IMainWindowNotifyIconService>();
        /// <summary>
        /// SplashScreenService
        /// </summary>
        public ISplashScreenService SplashScreenService => MainDataContext.GetService<ISplashScreenService>();
        /// <summary>
        /// MessageBox Service
        /// </summary>
        public IMessageBoxService MessageBoxService => MainDataContext.GetService<IMessageBoxService>();
        /// <summary>
        /// ApplicationJumpListService
        /// </summary>
        public IApplicationJumpListService ApplicationJumpListService => MainDataContext.GetService<IApplicationJumpListService>();
        /// <summary>
        /// NotificationService
        /// </summary>
        public INotificationService NotificationService => MainDataContext.GetService<INotificationService>();
        /// <summary>
        /// NotifyIconService
        /// </summary>
        public INotifyIconService NotifyIconService => MainDataContext.GetService<INotifyIconService>();
        /// <summary>
        /// DialogService
        /// </summary>
        public IDialogService DialogService => MainDataContext.GetService<IDialogService>();
        /// <summary>
        /// Report Service
        /// </summary>
        public IReportService REPORTSERVICE => MainDataContext.GetService<IReportService>();
        /// <summary>
        /// 리포트 프린터 서비스
        /// </summary>
        public IReportPrinterService REPORTPRINTERSERVICE => MainDataContext.GetService<IReportPrinterService>();
        /// <summary>
        /// 리포트 인쇄 서비스
        /// </summary>
        public IReportPrintService REPORTPRINTSERVICE => MainDataContext.GetService<IReportPrintService>();
        /// <summary>
        /// REST 통신 서비스
        /// </summary>
        public IRESTService RESTSERVICE => MainDataContext.GetService<IRESTService>();
        /// <summary>
        /// MainWindow 서비스
        /// </summary>
        public IMainWindowService MAINWINDOWSERVICE => MainDataContext.GetService<IMainWindowService>();
        /// <summary>
        /// RibbonControl 서비스
        /// </summary>
        public IRibbonControlService RIBBONCONTROLSERVICE => RibbonDataContext.GetService<IRibbonControlService>();
        /// <summary>
        /// Ribbon 서비스
        /// </summary>
        public IRibbonViewService RIBBONVIEWSERVICE => RibbonDataContext.GetService<IRibbonViewService>();
        /// <summary>
        /// RibbonMenu 서비스
        /// </summary>
        public IRibbonMenuService RIBBONMENUSERVICE => RibbonDataContext.GetService<IRibbonMenuService>();
        /// <summary>
        /// NavBarControlService
        /// </summary>
        public INavBarControlService NAVBARCONTROLSERVICE => RibbonDataContext.GetService<INavBarControlService>();
        /// <summary>
        /// NavBarMenuService
        /// </summary>
        public INavBarMenuService NAVBARMENUSERVICE => RibbonDataContext.GetService<INavBarMenuService>();
        /// <summary>
        /// OfficeNavgationBarService
        /// </summary>
        public IOfficeNavgationBarService OFFICENAVGATIONBARSERVICE => RibbonDataContext.GetService<IOfficeNavgationBarService>();
        /// <summary>
        /// DocumentManagerService
        /// </summary>
        public IDocumentManagerService DocumentManagerService => RibbonDataContext.GetService<IDocumentManagerService>();
        /// <summary>
        /// NavigationFrame
        /// </summary>
        public INavigationFrame NavigationFrame => RibbonDataContext.ActiveViewModel.GetService<INavigationFrame>();
        /// <summary>
        /// 사용자 메뉴 서비스
        /// </summary>
        public IUserMenuService USERMENUSERVICE => MainDataContext.GetService<IUserMenuService>();
        /// <summary>
        /// 사용자 즐겨찾기 서비스
        /// </summary>
        public IUserFavoriteService USERFAVORITESERVICE => MainDataContext.GetService<IUserFavoriteService>();
        /// <summary>
        /// FlyoutControl 서비스
        /// </summary>
        public IFlyoutControlService FLYOUTCONTROLSERVICE => ribbon.flyout;
        /// <summary>
        /// Kafka 서비스
        /// </summary>
        public IKafkaService KAFKASERVICE => MainDataContext.GetService<IKafkaService>();
        #endregion


        #region 추가 서비스

        #region 확장 서비스


        /// <summary>
        /// 파일 모니터링 서비스
        /// </summary>
        public ICustomTimerService CUSTOMTIMERSERVICE => MainDataContext.GetService<ICustomTimerService>();

        #endregion

        #endregion
    }



}
