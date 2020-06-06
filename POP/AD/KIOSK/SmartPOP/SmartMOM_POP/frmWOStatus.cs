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
    public partial class frmWOStatus : Form
    {
        string _now_date = "";
        string _wo = "";
        string _wo_state = "";
        //string _po = "";
        string _buttonType = "NODATA";
        string _todayFlag = "TODAY";

        SerialPort _serialButton1 = new SerialPort();
        SerialPort _serialButton2 = new SerialPort();

        public frmWOStatus()
        {
            InitializeComponent();

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
                //_po = grdMain.Rows[0].Cells["고객사제번"].Value.ToString();

            }

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
            //_po = grdMain.Rows[rowindex].Cells["고객사제번"].Value.ToString();
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
                    //grid_select();
                }
                else if (buf == "1" && _buttonType == "TWO")
                {
                   // grid_select();
                }
            }
            ));
        }

        private void InitLabelList()
        {
            //                                    0              1                2              3          4           5                6             7            8             9             10              
            string[] headerText = new string[] {  "라인명",      "작업지시번호",  "상태",        "품목",    "품명",     "규격",          "계획수량",   "잔량수량",  "작업일자",   "양품수량",   "불량수량",  "최종실적처리시간", "WOSTATE"  };
            string[] columnName = new string[] {  "RESOURCENAME","WORKORDERID",   "WOSTATENAME", "ITEMID",  "ITEMNAME", "SPECIFICATION", "CONFIRMQTY", "REMAINQTY", "PLANDATE",   "GOODQTY",    "BADQTY",    "LASTRESULTTIME",   "WOSTATE" };
            string[] columnType = new string[] {  "T",           "T",             "T",           "T",       "T",        "T",             "T",          "T",         "T",          "T",          "T",         "T",                "T" };
                                                                                                                                                                                                                                 
            int[] columnWidth    = new int[]   {  140,           250,             120,           200,       330,        400,             180,          180,         210,          180,          150,         230,                10 };
            bool[] columnVisible = new bool[]  {  true,          true,            true,          true,      true,       false,           true,         false,       false,        true,         true,        true,               false };
            bool[] columnDisable = new bool[]  {  true,          true,            true,          true,      true,       true,            true,         true,        true,         true,         true,        true,               true };
            string[] cellAlign = new string[]  {  "C",           "C",             "C",           "L",       "L",        "L",             "R",          "R",         "C",          "R",          "R",         "C",                "C" };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 70;
            grdMain.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }        

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void lblToday_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmNowDate frm = new frmNowDate(lblToday.Text.Split(' ')[0]);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblToday.Text = clsStatic._dialogValue;

                clsStatic._dialogValue = "";
            }
        }

        private void wo_search()
        {

            string planDate = lblToday.Text.Split(' ')[0];

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_PLAN_DATE", planDate);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable woDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_wo_status.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            grdMain.DataBindDataSource(woDt, false, false);

            grdMain_Color_change();
        }

        private void grdMain_Color_change()
        {
            string wostate = "";
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                wostate = grdMain["WOSTATE", i].Value.ToString().Replace(",", "");

                if (wostate == "T")
                {
                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.BackColor = Color.DarkGray;
                        grdMain[j, i].Style.ForeColor = Color.LightGray;
                    }
                }
                else if(wostate == "R")
                {
                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.BackColor = Color.LightGoldenrodYellow;
                    }
                }
                else if(wostate == "C")
                {
                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.LightGray;
                    }
                }
            }
        }

        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex < 0)
            {
                return;
            }
            int columnIndex = ((ExGrid)sender).CurrentCell.ColumnIndex;
            int rowIndex = ((ExGrid)sender).CurrentRow.Index;

            if(rowIndex >= 0)
            {
                _wo = grdMain.Rows[rowIndex].Cells["작업지시번호"].Value.ToString();
                //_po = grdMain.Rows[rowIndex].Cells["고객사제번"].Value.ToString();
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

        /// <summary>
        /// 조회
        /// </summary>
        private void btnSearch_Click(object sender, EventArgs e)
        {
            wo_search();
        }
    }
}
