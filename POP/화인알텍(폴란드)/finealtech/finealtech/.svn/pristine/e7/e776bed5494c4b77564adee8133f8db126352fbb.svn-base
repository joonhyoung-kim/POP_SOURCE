// *********************************************************************************************************
// **  class: RibbonViewModel.cs
// **  description: RibbonView ViewModel
// **  writer: 티라유텍 전진근 책임
// **  date : 2019.02.08 1차 작성
// *********************************************************************************************************
// ** 
// *********************************************************************************************************

using TU.Core;
using System.Windows.Input;

namespace MOM.RPT.Modules
{
    public partial class RibbonViewModel : TViewModelBase
    {
        

        #region Buttons

        /// <summary>
        /// 도움말
        /// </summary>
        public ICommand HelpCommand
        {
            get;
            set;
        }
        /// <summary>
        /// 즐겨찾기
        /// </summary>
        public ICommand FavoriteCommand
        {
            get;
            set;
        }

        #endregion

        public RibbonViewModel() : base()
        {
            HelpCommand = new TUCommand
            {
                ExecuteDelegate = o =>
                {
                    // System.Diagnostics.Process.Start(LoginUser.ManualURL);
                }
            };

            FavoriteCommand = new TUCommand
            {
                ExecuteDelegate = o =>
                {
                    //_eventAggregator.GetEvent<ConfigFlyoutEvent>().Publish(new FlyoutItem { });                    
                }
            };

        }

        #region override method

        protected override void UIInitializeComponent()
        {

        }

        public override void UIClear()
        {
            
        }

        public override void UIRefresh()
        {

        }

        public override void UINavigated()
        {
            
        }

        #endregion        

    }


}
