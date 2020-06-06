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
    public partial class frmWoResultCancel : Form
    {
        DataTable _moveDt = new DataTable();
        DataTable _departureDt = new DataTable();
        DataTable _scanDt = new DataTable();
        DataTable _MainDt = new DataTable();

        public frmWoResultCancel()
        {
            InitializeComponent();

            lblFromStock.Text = clsStatic._RESOURCE_TEXT + "(" + clsStatic._RESOURCE_CD + ")";
            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            newScanDt();
            InitGridList();
            btnSet_Click(null, null);

        }

        #region Init
        private void newScanDt()
        {
            _scanDt.Dispose();
            _scanDt = new DataTable();

            _scanDt.Columns.Add("GANBANID");
            _scanDt.Columns.Add("WORKORDERRESULTID");
            _scanDt.Columns.Add("ITEMID");
        }

        private void InitGridList()
        {
            //                                   0           1                      2               3            
            string[] headerText = new string[] { "실적라벨", "작업실적ID",         "작업지시서",   "품목",   "품명",      "양품수량",   "불량수량" }; 
            string[] columnName = new string[] { "GANBANID", "WORKORDERRESULTID",   "WORKORDERID",  "ITEMID", "ITEMNAME",  "GOODQTY",    "BADQTY"   };
            string[] columnType = new string[] { "T",        "T",                   "T",            "T",      "T",         "T",          "T"        };
                                                                                                                                                                                                                                                                                                                                          
            int[] columnWidth    = new int[]   { 200,        300,                   230,            230,      300,         150,          150    };
            bool[] columnVisible = new bool[]  { true,       true,                  true,           true,     true,        true,         true   };
            bool[] columnDisable = new bool[]  { true,       true,                  true,           true,     true,        true,         true   };
            string[] cellAlign = new string[]  { "C",        "C",                   "C",            "C",      "L",         "R",          "R"    };
                                                                                                                                                                                                  
            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 18);
            grdMain.DefaultCellStyle.ForeColor = Color.Black;
            grdMain.RowTemplate.Height = 70;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 19, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        #endregion

        #region 바코드 입력창 event
        /// <summary>
        /// 바코드 입력창 포커스
        /// </summary>
        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        /// <summary>
        /// 바코드 입력창 포커스 잃을 경우
        /// </summary>
        private void txtSN_Leave(object sender, EventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Red;
            }
        }

        /// <summary>
        /// 바코드 스캔
        /// </summary>
        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (txtSN.Text.Trim() == "")
                {
                    return;
                }
                else
                {
                    add_Ganban();
                }
                txtSN_Focus();
            }
        }

        /// <summary>
        /// 스캔한 간판 정보 조회
        /// </summary>
        private void add_Ganban()
        {
            string ganban = "";
            ganban = txtSN.Text.Trim();

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD",  clsStatic._COMPANY_CD);
            paramsMap1.Add("RESOURCE_CD", clsStatic._RESOURCE_CD); 
            paramsMap1.Add("GANBAN_ID", ganban);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            //간판 정보 조회
            DataTable ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganbanInfoForResultCancel.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (ganBodyDt == null)
            {
                frmMessage2 frm1 = new frmMessage2("입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganBodyDt.Rows.Count == 0)
            {
                frmMessage2 frm1 = new frmMessage2("입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string location = ganBodyDt.Rows[0]["LOCATIONCD"].ToString();


            //if (ganBodyDt.Rows[0]["BINID"].ToString() == "" || ganBodyDt.Rows[0]["BINID"].ToString() == null)
            //{
            //    frmMessage frm1 = new frmMessage("입고처리되지 않은 간판라벨 입니다.", "AUTOCLOSE");
            //    frm1.ShowDialog();
            //    txtSN_Focus();
            //    return;
            //}

            DataRow[] drs = _scanDt.Select("GANBANID = '" + ganban + "'");

            if (drs.Length > 0)
            {
                frmMessage2 frm1 = new frmMessage2("이미 입력한 실적라벨입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }


            if (_MainDt.Columns.Count == 0)
            {
                _MainDt = ganBodyDt.Clone();
            }

            for (int i = 0; i < ganBodyDt.Rows.Count; i++)
            {
                _MainDt.ImportRow(ganBodyDt.Rows[i]);
                _scanDt.Rows.Add(ganban, ganBodyDt.Rows[i]["WORKORDERRESULTID"].ToString(), ganBodyDt.Rows[i]["ITEMID"].ToString());
            }
            //grdMain.RemoveAll();
            grdMain.DataBindDataSource(_MainDt, false, false);

        }


        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Yellow;
            }
        }

        #endregion

        #region 그리드 Event

        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void grdMain_Color_change()
        {
            /*
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                grdMain["품목", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["품명", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["규격", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);

                grdMain["잔량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold | FontStyle.Underline);
                grdMain["잔량", i].Style.BackColor = Color.DodgerBlue;

                grdMain["스캔수량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold | FontStyle.Underline);
                grdMain["스캔수량", i].Style.BackColor = Color.DodgerBlue;

                int remainQty = int.Parse(grdMain["잔량", i].Value.ToString());
                int scanQty = int.Parse(grdMain["스캔수량", i].Value.ToString());
                if (remainQty <= scanQty)
                {
                    for (int j = 0; j < grdMain.Columns.Count; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Red;
                    }
                }
                else
                {
                    for (int j = 0; j < grdMain.Columns.Count; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Black;
                    }
                }
            }
            */
        }

        #endregion

        #region 실적취소 처리 Event
        /// <summary>
        /// 소진처리 버튼 클릭
        /// </summary>
        private void btnCancel_Click(object sender, EventArgs e)
        {
            frmMessage2 frm = new frmMessage2("실적 취소 처리 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                bool resultChk = true;

                for (int i = 0; i < grdMain.Rows.Count; i++)
                {
                    if (resultChk)
                    {
                        string ganban = grdMain["실적라벨", i].Value.ToString();
                        string wo_result_id = grdMain["작업실적ID", i].Value.ToString();
                        string workorder_id = grdMain["작업지시서", i].Value.ToString();


                        //간판라벨 소진 처리
                        resultChk = woResult_cancel_process(ganban, wo_result_id, workorder_id);
                    }
                    else
                    {
                        frmMessage frm1 = new frmMessage("실적취소 처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        txtSN_Focus();
                        i = grdMain.Rows.Count;
                    }
                }

                if (resultChk)
                {
                    frmMessage frm3 = new frmMessage("실적취소 처리가 정상적으로 처리었습니다.", "AUTOCLOSE");
                    frm3.ShowDialog();

                    txtSN.Text = "";
                    grdMain.RemoveAll();
                    _MainDt.Clear();
                    newScanDt();

                    txtSN_Focus();
                }
            }            
        }

       private bool woResult_cancel_process (string ganban, string wo_result_id, string workorder_id)
       {

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();

            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_work_result_id", wo_result_id);
            paramsMap.Add("p_work_order_id", workorder_id);
            paramsMap.Add("p_ganban_id", ganban);
            paramsMap.Add("p_update_by", clsStatic._USER_ID);

            paramsList.Add(paramsMap);

            string retvalue = "";

            //실적 취소 프로시저 호출
            DataTable resultDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_woResult_cancel_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (resultDt == null)
            {
                return false;
            }

            if (resultDt.Rows.Count == 0)
            {
                return false;
            }

            return true;
        }

        #endregion

        #region 화면 상단 Control Event
        /// <summary>
        /// 닫기 버튼 클릭
        /// </summary>
        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }
        #endregion

        #region 화면 하단 Control Event
        /// <summary>
        /// 스캔리스트 버튼 클릭
        /// </summary>
        private void btnScanList_Click(object sender, EventArgs e)
        {
            frmScanView frm1 = new frmScanView(_scanDt, "실적취소");
            frm1.ShowDialog();
        }

        /// <summary>
        /// 간판라벨 발행(Split) 버튼 클릭
        /// </summary>
        private void btnManualPrint_Click(object sender, EventArgs e)
        {
            frmGanbanSplit frm = new frmGanbanSplit();
            frm.ShowDialog();
        }

        /// <summary>
        /// 화면 초기화 버튼 클릭
        /// </summary>
        private void btnPageInit_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("현재 화면을 초기화 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                txtSN.Text = "";
                grdMain.RemoveAll();
                _MainDt.Clear();
                newScanDt();

                txtSN_Focus();
            }
        }
        #endregion

        
    }
}
