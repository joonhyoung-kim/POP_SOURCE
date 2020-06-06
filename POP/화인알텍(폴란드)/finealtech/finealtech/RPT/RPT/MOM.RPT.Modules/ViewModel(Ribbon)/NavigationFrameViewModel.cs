// *********************************************************************************************************
// **  class: RibbonViewModel.cs
// **  description: RibbonView ViewModel
// **  writer: 티라유텍 전진근 책임
// **  date : 2019.02.08 1차 작성
// *********************************************************************************************************
// ** 
// *********************************************************************************************************

using TU.Core;
using TU.Core.Models;

namespace MOM.RPT.Modules
{
    public partial class NavigationFrameViewModel : TFrameViewModelBase
    {

        public NavigationFrameViewModel() : base()
        {

        }

        #region override method

        protected override void UIInitializeComponent()
        {
            ActiveMenu = new MenuItem(this);
        }

        #endregion        

    }


}
