// *********************************************************************************************************
// **  class: RibbonViewModel_Model.cs
// **  description: RibbonView ViewModel Property
// **  writer: 티라유텍 전진근 책임
// **  date : 2019.02.08 1차 작성
// *********************************************************************************************************
// **  
// *********************************************************************************************************

using DevExpress.Xpf.Ribbon;
using System;
using TU.Core.Models;

namespace MOM.RPT.Modules
{
    public partial class RibbonViewModel
    {

        private RibbonStyle _ribbonStyle = RibbonStyle.Office2010;
        /// <summary>
        /// Ribbon Style
        /// </summary>
        public RibbonStyle RibbonStyle
        {
            get { return _ribbonStyle; }
            set { SetProperty(ref _ribbonStyle, value); }
        }

        private RibbonHeaderVisibility _ribbonHeader = RibbonHeaderVisibility.Visible;
        /// <summary>
        /// RibbonHeader Visibility
        /// </summary>
        public RibbonHeaderVisibility RibbonHeader
        {
            get { return _ribbonHeader; }
            set { SetProperty(ref _ribbonHeader, value); }
        }

    }
}
