// *********************************************************************************************************
// **  class: RibbonViewService.cs
// **  description: IRibbonViewService interface implements
// **  writer: 티라유텍 전진근 책임
// **  date : 2019.02.08 1차 작성
// *********************************************************************************************************
// **  
// *********************************************************************************************************

using TU.Core.Models;
using TU.Core.Interfaces;
using System.Collections.Generic;
using DevExpress.Mvvm;
using DevExpress.Xpf.Docking;
using DevExpress.Mvvm.UI;
using TU.Core.Helpers;
using TU.Core;
using System.Windows;
using System.Windows.Controls;

namespace MOM.RPT.Modules
{
    public partial class RibbonViewService : ServiceBase, IRibbonViewService
    {
        public IMainWindow MAIN => Application.Current.MainWindow as IMainWindow;

        public object DataContext => AssociatedObject.DataContext;

        public object ActiveViewDataContext => DocumentService.ActiveView == null ? null : (DocumentService.ActiveView as Control)?.DataContext;
        public object ActiveDocumentDataContext => DocumentService.ActiveDocument == null ? null : (DocumentService.ActiveDocument.Content as Control)?.DataContext;

        private RibbonView Ribbon => AssociatedObject as RibbonView;
        /// <summary>
        /// RibbonControl
        /// </summary>
        public RibbonViewModel RibbonDataContext => AssociatedObject.DataContext as RibbonViewModel;

        public TabbedDocumentUIService DocumentService => Ribbon.tabbedDocumentService;


        protected override void OnAttached()
        {
            AssociatedObject.Loaded -= AssociatedObject_Loaded;

            base.OnAttached();

            AssociatedObject.Loaded += AssociatedObject_Loaded;

        }


        protected override void OnDetaching()
        {
            AssociatedObject.Loaded -= AssociatedObject_Loaded;

            base.OnDetaching();
        }

        private void AssociatedObject_Loaded(object sender, RoutedEventArgs e)
        {
            DocumentService.DocumentGroup.SelectedItemChanged -= DocumentGroup_SelectedItemChanged;
            DocumentService.DocumentGroup.SelectedItemChanged += DocumentGroup_SelectedItemChanged;

        }

        private void DocumentGroup_SelectedItemChanged(object sender, DevExpress.Xpf.Docking.Base.SelectedItemChangedEventArgs e)
        {
            if (e.Item == null)
            {
                return;
            }

            DocumentPanel document = e.Item as DocumentPanel;
            document.Loaded += (sender2, e2) =>
            {
                TViewModelBase viewModel = document.DataContext as TViewModelBase;
                viewModel.UINavigated();
            };
        }

        public void ServerModeCheck(bool testServer)
        {

        }

        /// <summary>
        /// 로그아웃 시 처리부
        /// </summary>
        public void Logout()
        {
            // Login 상태에서만 수행
            if (LoginUser.Instance.LoginYN)
            {
                if(MAIN.MAINWINDOWSERVICE.Confirmation(new MessageItem("", "")))
                {
                    // Logout 처리
                    UserAuthServiceHelper.Logout(RibbonDataContext);
                }

            }

        }
        /// <summary>
        /// 탭 생성
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewId"></param>
        /// <param name="para"></param>
        public void AddDocument(string id, string viewId, Dictionary<string, object> para = null, string frameId = "NavigationFrameView")
        {
            if (DocumentService == null)
            {
                return;
            }

            if( ParseHelper.IsNull( viewId) || ParseHelper.IsNull(frameId) )
            {
                return;
            }

            if ( frameId.Equals(viewId))
            {
                // frame 호출 시 parameter에서 이동할 ViewId으로 이동하도록 한다.
                if (!para.ContainsKey("VIEW_ID"))
                {
                    // frame일 경우 화면 viewid 없을경우 동작 안함.
                    return;
                }
            }

            IDocument doc = DocumentService.FindDocumentById(id);
            bool flag = doc != null;

            if (flag)
            {
                // id 존재시 해당 view active
                doc.Show();
                return;
            }

            // 신규 view
            doc = DocumentService.CreateDocument(viewId, para, RibbonDataContext);
            doc.Id = id;
            doc.DestroyOnClose = true;
            doc.Show();

        }

        public void RibbonControl_StatusUpdate()
        {

        }

    }
}
