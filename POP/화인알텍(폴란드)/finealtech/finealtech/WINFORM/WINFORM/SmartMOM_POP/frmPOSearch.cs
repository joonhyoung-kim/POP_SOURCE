using MetroFramework.Forms;
using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmPOSearch : Form
    {
        string _now_date = "";
        string _wo = "";
        string _wo_state = "";
        string _po = "";
        string _buttonType = "NODATA";
        string _todayFlag = "TODAY";

        SerialPort _serialButton1 = new SerialPort();
        SerialPort _serialButton2 = new SerialPort();

        public frmPOSearch(string wo_state)
        {
            InitializeComponent();

            _wo_state = wo_state;

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");
            lblToday.Text = DateTime.Now.ToString(string.Format("yyyy-MM-dd ddd", cultures));

            string strDate = lblToday.Text;

            _now_date = strDate.Split(' ')[0];

            InitLabelList();

            wo_search();

            if(grdMain.Rows.Count > 0)
            {
                grdMain.CurrentCell = grdMain.Rows[0].Cells[0];
                _wo = grdMain.Rows[0].Cells["작업지시번호"].Value.ToString();
                _po = grdMain.Rows[0].Cells["고객사제번"].Value.ToString();

            }

            //if (clsStatic._PUSHBUTTON1.IndexOf("COM") == 0)
            //{
            //    try
            //    {
            //        _serialButton1.PortName = clsStatic._PUSHBUTTON1;
            //        _serialButton1.Open();
            //        _buttonType = "ONE";

            //        _serialButton1.DataReceived += _serialButton1_DataReceived;
            //    }
            //    catch
            //    {

            //    }
            //}

            //if (clsStatic._PUSHBUTTON2.IndexOf("COM") == 0)
            //{
            //    try
            //    {
            //        _serialButton2.PortName = clsStatic._PUSHBUTTON2;
            //        _serialButton2.Open();
            //        _serialButton2.DataReceived += _serialButton2_DataReceived;

            //        _buttonType = "TWO";
            //    }
            //    catch
            //    {

            //    }
            //}

        }

        private void grid_select()
        {
            int rowIndex = grdMain.CurrentRow.Index;

            if (rowIndex >= 0)
            {
                _wo = grdMain.Rows[rowIndex].Cells["작업지시번호"].Value.ToString();
            }

            if (_wo != "")
            {
                grdMain.CurrentCell = grdMain.Rows[rowIndex].Cells[0];

                string popmakeqty = grdMain.Rows[rowIndex].Cells["입력기본수량"].Value.ToString();
                string popinputtype = grdMain.Rows[rowIndex].Cells["입력방식"].Value.ToString();
                string popctqty = grdMain.Rows[rowIndex].Cells["CT구성수량"].Value.ToString();

                string popgtlabelid = grdMain.Rows[rowIndex].Cells["GT라벨ID"].Value.ToString();
                string popctlabelid = grdMain.Rows[rowIndex].Cells["CT라벨ID"].Value.ToString();
                string poppalletlabelid = grdMain.Rows[rowIndex].Cells["PALLET라벨ID"].Value.ToString();

                if (popmakeqty.Trim() == ""
                    || popmakeqty.Trim() == ""
                    || popinputtype.Trim() == ""
                    || popctqty.Trim() == ""
                    || popgtlabelid.Trim() == ""
                    || popctlabelid.Trim() == ""
                    || poppalletlabelid.Trim() == "")
                {
                    frmMessage frm1 = new frmMessage("선택한 파트넘버의 기준정보를 확인하여 주세요!(관리자에게 문의 하세요)", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }

                clsStatic._WORK_ORDER_ID = _wo;
                this.Close();
            }
            else
            {
                frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요", "AUTOCLOSE");
                frm1.ShowDialog();
            }
        }

        private void grid_move(int rowindex, string movetype)
        {
            if (movetype == "DOWN")
            {
                rowindex++;
                if (rowindex >= grdMain.Rows.Count)
                {
                    rowindex = 0;
                }
            }
            else if (movetype == "UP")
            {
                rowindex--;
                if (rowindex < 0)
                {
                    rowindex = grdMain.Rows.Count - 1;
                }
            }
            grdMain.CurrentCell = grdMain.Rows[rowindex].Cells[0];
            _po = grdMain.Rows[rowindex].Cells["고객사제번"].Value.ToString();
            _wo = grdMain.Rows[rowindex].Cells["작업지시번호"].Value.ToString();
        }

        private void _serialButton2_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            this.Invoke(new MethodInvoker(delegate ()
            {
                string buf = _serialButton2.ReadLine();
                buf = buf.Replace("\r", "");

                int rowindex = grdMain.CurrentRow.Index;

                if (buf == "1")
                {
                    grid_move(rowindex, "DOWN");

                }
                else if (buf == "2")
                {
                    grid_move(rowindex, "UP");
                }
            }
            ));
        }

        private void _serialButton1_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            this.Invoke(new MethodInvoker(delegate ()
            {
                string buf = _serialButton1.ReadLine();
                buf = buf.Replace("\r", "");

                int rowindex = grdMain.CurrentRow.Index;



                if (buf == "1" && _buttonType == "ONE")
                {
                    grid_move(rowindex, "DOWN");

                }
                else if (buf == "2" && _buttonType == "ONE")
                {
                    grid_select();
                }
                else if (buf == "1" && _buttonType == "TWO")
                {
                    grid_select();
                }
            }
            ));
        }

        private void InitLabelList()
        {
            //                                   0                  1          2           3                4             5           6               7                  8             9             10               11              12               13              14              15               16               17                       
            string[] headerText = new string[] {  "고객사제번",     "품목",    "품명",     "규격",          "지시량",     "잔량수량", "작업지시번호", "작업일자",        "양품수량",   "불량수량",    "작업지시유형", "상태",         "입력기본수량",  "입력방식",     "CT구성수량",   "GT라벨ID",      "CT라벨ID",      "PALLET라벨ID"      }; //18
            string[] columnName = new string[] {  "PRODUCTORDERID", "ITEMID",  "ITEMNAME", "SPECIFICATION", "CONFIRMQTY", "REMAINQTY","WORKORDERID",  "PLANDATE",        "QTY",        "BADQTY",      "WOTYPENAME",   "WOSTATENAME",  "POPMAKELOTQTY", "POPINPUTTYPE", "POPCTQTY",     "POPGTLABELID",  "POPCTLABELID",  "POPPALLETLABELID"  };
            string[] columnType = new string[] {  "T",              "T",       "T",        "T",             "T",          "T",        "T",            "T",               "T",          "T",           "T",            "T",            "T",             "T",            "T",            "T",             "T",             "T"                 };
                                                                  
            int[] columnWidth    = new int[]   {  248,              248,       450,        400,             130,          130,        290,            210,               80,           80,            100,            230,            100,             100,            100,            100,             100,             100                 };
            bool[] columnVisible = new bool[]  {  true,             true,      true,       true,            true,         true,       true,           true,              true,         true,          true,           true,           true,            true,           true,           true,            true,            true                };
            bool[] columnDisable = new bool[]  {  true,             true,      true,       true,            true,         true,       true,           true,              true,         true,          true,           true,           true,            true,           true,           true,            true,            true                };
            string[] cellAlign = new string[]  {  "C",              "L",       "L",        "L",             "R",          "R",        "C",            "C",               "R",          "R",           "C",            "C",            "C",             "C",            "C",            "C",             "C",             "C"                 };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 24F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 120;
            grdMain.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void addDays(int day)
        {
            string strDate = lblToday.Text;

            strDate = strDate.Split(' ')[0];

            DateTime dt = DateTime.Parse(strDate).AddDays(day);

            _now_date = dt.ToString("yyyy-MM-dd");

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            lblToday.Text = dt.ToString(string.Format("yyyy-MM-dd ddd", cultures));

            //search_process();
        }

        private void addMonths(int month)
        {
            string strDate = lblToday.Text;

            strDate = strDate.Split(' ')[0];

            DateTime dt = DateTime.Parse(strDate).AddMonths(month);

            _now_date = dt.ToString("yyyy-MM-dd");

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            lblToday.Text = dt.ToString(string.Format("yyyy-MM-dd ddd", cultures));

            //search_process();
        }

        private void btnMonthprev_Click(object sender, EventArgs e)
        {
            addMonths(-1);
        }

        private void btnDayprev_Click(object sender, EventArgs e)
        {
            addDays(-1);
        }

        private void btnDayafter_Click(object sender, EventArgs e)
        {
            addDays(1);
        }

        private void btnMonthafter_Click(object sender, EventArgs e)
        {
            addMonths(1);
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void lblToday_Click(object sender, EventArgs e)
        {
            wo_search();
        }

        private void wo_search()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsMap.Add("NOWDATE", _now_date);
            paramsMap.Add("WO_STATE", _wo_state);
            paramsMap.Add("TODAYFLAG", _todayFlag);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable woDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popwo_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            grdMain.DataBindDataSource(woDt, false, false);
        }

        private void btnOK_Click(object sender, EventArgs e)
        {
            if (_wo != "")
            {
                int rowIndex = grdMain.CurrentRow.Index;

                grdMain.CurrentCell = grdMain.Rows[rowIndex].Cells[0];

                string popmakeqty = grdMain.Rows[rowIndex].Cells["입력기본수량"].Value.ToString();
                string popinputtype = grdMain.Rows[rowIndex].Cells["입력방식"].Value.ToString();
                string popctqty = grdMain.Rows[rowIndex].Cells["CT구성수량"].Value.ToString();

                string popgtlabelid = grdMain.Rows[rowIndex].Cells["GT라벨ID"].Value.ToString();
                string popctlabelid = grdMain.Rows[rowIndex].Cells["CT라벨ID"].Value.ToString();
                string poppalletlabelid = grdMain.Rows[rowIndex].Cells["PALLET라벨ID"].Value.ToString();

                if(popmakeqty.Trim() == "" 
                    || popmakeqty.Trim() == ""
                    || popinputtype.Trim() == ""
                    || popctqty.Trim() == ""
                    || popgtlabelid.Trim() == ""
                    || popctlabelid.Trim() == ""
                    || poppalletlabelid.Trim() == "")
                {
                    frmMessage frm1 = new frmMessage("선택한 파트넘버의 기준정보를 확인하여 주세요!(관리자에게 문의 하세요)", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }

                _po = grdMain.Rows[0].Cells["고객사제번"].Value.ToString();

                clsStatic._WORK_ORDER_ID = _wo;
                this.Close();
            }
            else
            {
                frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요", "AUTOCLOSE");
                frm1.ShowDialog();
            }
        }

        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int columnIndex = ((ExGrid)sender).CurrentCell.ColumnIndex;
            int rowIndex = ((ExGrid)sender).CurrentRow.Index;

            if(rowIndex >= 0)
            {
                _wo = grdMain.Rows[rowIndex].Cells["작업지시번호"].Value.ToString();
                _po = grdMain.Rows[rowIndex].Cells["고객사제번"].Value.ToString();
            }
        }

        private void frmPOSearch_FormClosed(object sender, FormClosedEventArgs e)
        {
            //if (_serialButton1.IsOpen == true)
            //{
            //    _serialButton1.Close();
            //}

            //if (_serialButton2.IsOpen == true)
            //{
            //    _serialButton2.Close();
            //}
        }

        private void btnTodayFlag_Click(object sender, EventArgs e)
        {
            if(btnTodayFlag.Text == "오늘")
            {
                btnTodayFlag.Text = "오늘이전";
                btnTodayFlag.BackColor = Color.Red;
                btnTodayFlag.ForeColor = Color.Yellow;
                _todayFlag = "YESTERDAY";
            }
            else
            {
                btnTodayFlag.Text = "오늘";
                btnTodayFlag.BackColor = Color.Silver;
                btnTodayFlag.ForeColor = Color.Black;
                _todayFlag = "TODAY";
            }
        }

        private void btnUp_Click(object sender, EventArgs e)
        {
            int rowindex = grdMain.CurrentRow.Index;
            grid_move(rowindex, "UP");
        }

        private void btnDown_Click(object sender, EventArgs e)
        {
            int rowindex = grdMain.CurrentRow.Index;
            grid_move(rowindex, "DOWN");
        }
    }
}
