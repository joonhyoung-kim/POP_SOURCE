using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using SmartMom_Lib;
using System.Globalization;
using System.Threading;

namespace SmartMOM_POP
{
    public partial class ucGanbanManual : UserControl
    {
        DataTable _gridDt = new DataTable();
        DataSet _BasicDs = new DataSet();

        public ucGanbanManual()
        {
            InitializeComponent();

            InitMainList();
        }

        #region Init Event

        //메인그리드
        private void InitMainList()
        {
            //                                    1         2           3       4             5            
            string[] headerText  = new string[] { "품목",   "품명",     "창고", "생성일",     "생성수량",  };
            string[] columnName  = new string[] { "ITEMID", "ITEMNAME", "SLOC", "CREATEDATE", "QTY",       };
            string[] columnType  = new string[] { "T",      "T",        "T",    "T",          "T",         };
                                                                                                           
            int[] columnWidth    = new int[]    { 195,      270,        130,    160,          270,         };
            bool[] columnVisible = new bool[]   { true,     true,       true,   true,         true,        };
            bool[] columnDisable = new bool[]   { true,     true,       true,   true,         true,        };
            string[] cellAlign   = new string[] { "L",      "L",        "R",    "C",          "L",         };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 14F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 50;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 14F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        #endregion

        #region 상단 Condition 영역 Event
        //화면 초기화
        private void btnInit_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("화면을 초기화 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                init();
            }
        }

        public void init()
        {
            grdMain.RemoveAll();
            _gridDt.Clear();
            txtSN.Text = "";
            lbl_qty.Text = "";

            txtSN_Focus();
        }

        // set 클릭
        private void btn_set_Click(object sender, EventArgs e)
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        // 입력창 입력 완료
        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (clsStatic._TOLINE.Equals(""))
            {
                frmMessage frm1 = new frmMessage("라벨 생성 대상 창고가 선택되지 않았습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (e.KeyCode == Keys.Enter)
            {
                if (txtSN.Text.Trim() == "")
                {
                    return;
                }
                else
                {
                    search_manual_item();
                }
                txtSN_Focus();
            }
        }

        // 입력창 떠남
        private void txtSN_Leave(object sender, EventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Red;
            }
        }

        // 입력창 클릭
        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Yellow;
            }
        }

        // 입력창 포커싱
        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        // 수동발행 클릭
        private void btn_manual_Click(object sender, EventArgs e)
        {
            ganban_manual_item();
        }
        #endregion

        #region 하단 Condition 영역 Event
        // 수동수량입력 클릭
        private void btnInput_Click(object sender, EventArgs e)
        {
            keypadEvent(lbl_qty);
        }
        #endregion

        #region 라벨 스캔 Event
        // 품목정보 조회
        private void search_manual_item()
        {
            string itemId = "";
            itemId = txtSN.Text.Trim();

            if (grdMain.Rows.Count > 0)
            {
                for (int i = 0;i < grdMain.Rows.Count;i++)
                {
                    if (itemId.Equals(grdMain.Rows[i].Cells["품목"].Value))
                    {
                        frmMessage frm1 = new frmMessage("이미 조회된 품목 입니다.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        txtSN_Focus();
                        return;
                    }
                }
            }

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("ITEM_ID", itemId);
            paramsMap1.Add("SLOC", clsStatic._TOLINE);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable gridDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganbanManualItem.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (gridDt == null)
            {
                frmMessage frm1 = new frmMessage("입력한 품목 정보가 존재하지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (gridDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("입력한 품목 정보가 존재하지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            setGrdAdd(grdMain, gridDt);
        }
        #endregion

        #region 내부 Event
        private void keypadEvent(Label keypadLabel)
        {

            if (keypadLabel.Text == "")
            {
                keypadLabel.Text = "0";
                frmMessage frm1 = new frmMessage("간판 라벨 조회 후 입력 하세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (keypadLabel.Text.Trim() == "")
            {
                keypadLabel.Text = "0";
            }

            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(keypadLabel.Text.Trim().Replace(",", ""));
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                keypadLabel.Text = int.Parse(clsStatic._dialogValue).ToString("###,##0");

                int rowNow = grdMain.CurrentRow.Index;

                int inputQty = int.Parse(clsStatic._dialogValue);
                
                grdMain["생성수량", rowNow].Value = int.Parse(clsStatic._dialogValue).ToString("###,##0");

                clsStatic._dialogValue = "";
            }
        }

        private void ganban_manual_item()
        {
            if (grdMain.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("라벨 발행 대상 품목이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                if (int.Parse(grdMain.Rows[i].Cells["생성수량"].Value.ToString().Replace(",", "")) <= 0)
                {
                    frmMessage frm1 = new frmMessage("라벨 발행 수량은 '0' 보다 커야 합니다.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }
            }

            string retbuf = "";
            retbuf = get_ganbanSeq();

            if (retbuf == "NG")
            {
                frmMessage frm1 = new frmMessage("현재 라벨발행 진행중입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            frmMessage frm = new frmMessage("간판라벨 발행을 실행 하시겠습니까?(생성수량 기준)", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            try
            {
                if (result == DialogResult.OK)
                {
                    for (int i = 0; i < grdMain.Rows.Count; i++)
                    {
                        make_ganban(retbuf, grdMain.Rows[i].Cells["생성수량"].Value.ToString(), grdMain.Rows[i].Cells["품목"].Value.ToString(), clsStatic._TOLINE);
                    }
                }
            } catch (Exception ex)
            {
                delete_ganban_tmp(retbuf);
                frmMessage frm1 = new frmMessage("라벨 발행에 실패했습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            ganban_print(retbuf);

            frmMessage finish = new frmMessage("라벨 생성이 완료되었습니다.", "AUTOCLOSE");
            finish.ShowDialog();

            grdMain.RemoveAll();
            _gridDt.Clear();
            txtSN.Text = "";
            lbl_qty.Text = "";

            txtSN_Focus();
        }

        private string get_ganbanSeq()
        {
            string retvalue = "";
            string retbuf = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("IP_ADDRESS", clsStatic._GANBANPRINT);

            paramsCheckList.Add(paramsCheckMap);

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanCheck.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                return "NG";
            }

            if (checkDt.Rows.Count <= 0)
            {
                return "NG";
            }

            if (int.Parse(checkDt.Rows[0]["LABELCNT"].ToString().Trim()) > 0)
            {
                return "NG";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanseq.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt == null)
            {
                return "NG";
            }

            if (dt.Rows.Count <= 0)
            {
                return "NG";
            }

            retbuf = dt.Rows[0]["GANBANSEQ"].ToString().Trim();

            return retbuf;

        }

        private void make_ganban(string labelid, string qty, string itemId, string line)
        {
            string ganban = "";

            ganban = "-";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ganbanid", "");
            paramsMap.Add("P_LABEL_ID", labelid);
            paramsMap.Add("P_IP_ADDRESS", clsStatic._GANBANPRINT);
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_ITEM_ID", itemId);
            paramsMap.Add("P_DEPARTURE_GROUP_ID", "-");
            paramsMap.Add("P_WORK_ORDER_ID", "-");
            paramsMap.Add("P_GOOD_QTY", qty);
            paramsMap.Add("P_FROM_SLOC", "-");
            paramsMap.Add("P_SLOC", clsStatic._TOLINE);
            paramsMap.Add("P_VENDOR_CD", "-");
            paramsMap.Add("P_DESCRIPTION", "from MANUAL");
            paramsMap.Add("P_PA_GANBAN_ID", ganban);
            paramsMap.Add("P_ITEM_STOCK_INOUT_ID", "-");
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbaninsert_proc_new1.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (ganbanAddDt == null)
            {
                frmMessage frm1 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }
        }

        private void delete_ganban_tmp(string labelid)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_LABEL_ID", labelid);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.deleteGanbanTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void ganban_print(string labelid)
        {
            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("LABEL_ID", labelid);

            paramsCheckList.Add(paramsCheckMap);
            string retvalue = "";
            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanPrintList.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                frmMessage frm1 = new frmMessage("출력할 간판라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (checkDt.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("출력할 간판라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            for (int i = 0; i < checkDt.Rows.Count; i++)
            {
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", "", checkDt.Rows[i]["GANBANID"].ToString(), "", ref _BasicDs);
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_LABEL_ID", labelid);

            paramsList.Add(paramsMap);

            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.deleteGanbanTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

        }

        private void setGrdAdd(ExGrid grid, DataTable inputData)
        {
            int now = grid.Rows.Add();

            grid["품목",     now].Value = inputData.Rows[0]["ITEMID"    ].ToString();
            grid["품명",     now].Value = inputData.Rows[0]["ITEMNAME"  ].ToString();
            grid["창고",     now].Value = inputData.Rows[0]["SLOC"      ].ToString();
            grid["생성일",   now].Value = inputData.Rows[0]["CREATEDATE"].ToString();
            grid["생성수량", now].Value = inputData.Rows[0]["QTY"       ].ToString();

        }

        #endregion

        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (grdMain.Rows.Count <= 0)
            {
                lbl_item.Text = "";
                lbl_qty.Text = "";
            }
            else
            {
                int nownow = grdMain.CurrentRow.Index;
                lbl_item.Text = grdMain["품명", nownow].Value.ToString();
                lbl_qty.Text = grdMain["생성수량", nownow].Value.ToString().Trim().Replace(",", "");
            }
        }
    }
}
