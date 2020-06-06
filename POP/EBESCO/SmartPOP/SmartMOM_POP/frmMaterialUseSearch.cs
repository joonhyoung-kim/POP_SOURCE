using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmMaterialUseSearch : Form
    {
        string _now_date = "";
        string _useYnFlag = "N";

        DataTable _MainDt = new DataTable();

        public frmMaterialUseSearch()
        {
            InitializeComponent();

            lblFromStock.Text = clsStatic._FROMLINE_DESC + "(" + clsStatic._FROMLINE + ")";
            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            lblToday.Text = DateTime.Now.ToString(string.Format("yyyy-MM-dd ddd", cultures));

            string strDate = lblToday.Text;

            _now_date = strDate.Split(' ')[0];

            InitGridList();
        }

        public frmMaterialUseSearch(string useYnFlag)
        {
            InitializeComponent();

            lblFromStock.Text = clsStatic._FROMLINE_DESC + "(" + clsStatic._FROMLINE + ")";
            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            lblToday.Text = DateTime.Now.ToString(string.Format("yyyy-MM-dd ddd", cultures));

            _useYnFlag = useYnFlag;

            string strDate = lblToday.Text;

            _now_date = strDate.Split(' ')[0];

            InitGridList();
        }

        #region Init

        private void InitGridList()
        {
            //                                   0           1         2            3            
            string[] headerText = new string[] { "간판라벨", "품목",   "품명",      "수량",     "사용여부" }; 
            string[] columnName = new string[] { "GANBANID", "ITEMID", "ITEMNAME",  "QTY" ,     "USEYN"    };
            string[] columnType = new string[] { "T",        "T",      "T",         "T"   ,     "T"        };
                                                                                                                                                                                                                                                                                                                                                    
            int[] columnWidth    = new int[]   { 230,        230,      300,         150,        150        };
            bool[] columnVisible = new bool[]  { true,       true,     true,        true,       true       };
            bool[] columnDisable = new bool[]  { true,       true,     true,        true,       true       };
            string[] cellAlign = new string[]  { "C",        "C",      "L",         "R" ,       "C"        };
                                                                                                                                                                                                  
            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 18);
            grdMain.DefaultCellStyle.ForeColor = Color.Black;
            grdMain.RowTemplate.Height = 70;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 19, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        #endregion

        #region 그리드 Event

        #endregion


        #region 화면 상단 Control Event
        /// <summary>
        /// 닫기 버튼 클릭
        /// </summary>
        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        #region 달력 날짜 Control Event
        private void btnMonthprev_Click(object sender, EventArgs e)
        {
            addMonths(-1);
        }

        private void btnMonthafter_Click(object sender, EventArgs e)
        {
            addMonths(1);
        }

        private void btnDayprev_Click(object sender, EventArgs e)
        {
            addDays(-1);
        }

        private void btnDayafter_Click(object sender, EventArgs e)
        {
            addDays(1);
        }

        private void addMonths(int month)
        {
            string strDate = lblToday.Text;

            strDate = strDate.Split(' ')[0];

            DateTime dt = DateTime.Parse(strDate).AddMonths(month);

            _now_date = dt.ToString("yyyy-MM-dd");

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            lblToday.Text = dt.ToString(string.Format("yyyy-MM-dd ddd", cultures));
        }

        private void addDays(int day)
        {
            string strDate = lblToday.Text;

            strDate = strDate.Split(' ')[0];

            DateTime dt = DateTime.Parse(strDate).AddDays(day);

            _now_date = dt.ToString("yyyy-MM-dd");

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            lblToday.Text = dt.ToString(string.Format("yyyy-MM-dd ddd", cultures));
        }

        #endregion

        #region 화면 조회 버튼
        private void button1_Click(object sender, EventArgs e)
        {
            ganban_search();
        }

        private void ganban_search()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("LOCATION_CD", clsStatic._FROMLINE);
            paramsMap.Add("NOWDATE", _now_date);
            paramsMap.Add("USE_YN", _useYnFlag);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable ganbanDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganban_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            grdMain.DataBindDataSource(ganbanDt, false, false);
        }
        #endregion
        #endregion

        #region 화면 하단 Control Event
        /// <summary>
        /// 화면 초기화 버튼 클릭
        /// </summary>
        private void btnPageInit_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("현재 화면을 초기화 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                grdMain.RemoveAll();
                _MainDt.Clear();
            }
        }

        #endregion


    }
}
