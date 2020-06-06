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
    public partial class ucGanbanSplit : UserControl
    {
        DataTable _gridDt = new DataTable();
        DataSet _BasicDs = new DataSet();
        string ganbanFlag = "N";

        public ucGanbanSplit()
        {
            InitializeComponent();

            InitMainList();
            InitSplitRow();
        }

        #region Init Event

        //메인그리드
        private void InitMainList()
        {
            //                                    1           2         3           4           5           6           7                   8               9            10          11         12          13          14            15          16
            string[] headerText = new string[] { "GanbanId", "ItemId", "ItemName", "IODate", "Qty", "Warehouse", "Departure Group Id", "WorkOrder", "PALLET ID", "CT ID", "From Location", "Move Date", "Move By", "Create Date", "Create By", "Name", "Use Yn" };
            string[] columnName = new string[] { "GANBANID", "ITEMID", "ITEMNAME", "IOTIME", "GOODQTY", "SLOC", "DEPARTUREGROUPID", "WORKORDERID", "PALLETID", "CT", "FROMSLOC", "MOVEDATE", "MOVEBY", "CREATEDATE", "CREATEBY", "NAME", "USEYN" };
            string[] columnType = new string[] { "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T" };

            int[] columnWidth = new int[] { 110, 195, 220, 120, 100, 130, 130, 130, 130, 130, 160, 150, 140, 150, 140, 140, 100 };
            bool[] columnVisible = new bool[] { true, true, true, false, true, false, false, true, false, false, false, false, false, true, true, true, true };
            bool[] columnDisable = new bool[] { true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true };
            string[] cellAlign = new string[] { "C", "L", "L", "C", "R", "L", "R", "R", "R", "R", "C", "C", "L", "L", "R", "C", "C" };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 50;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void InitSplitRow()
        {
            //                                    1      2
            string[] headerText = new string[] { "Seq", "Qty"};
            string[] columnName = new string[] { "SEQ", "QTY"};
            string[] columnType = new string[] { "T"  , "T"  };

            int[] columnWidth = new int[]      { 100  , 100  };
            bool[] columnVisible = new bool[]  { true , true };
            bool[] columnDisable = new bool[]  { true , true };
            string[] cellAlign = new string[]  { "C"  , "C"  };

            grdSplitRow.SetBorderAndGridlineStyles();
            grdSplitRow.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdSplitRow.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdSplitRow.RowTemplate.Height = 50;

            grdSplitRow.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdSplitRow.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        #endregion

        #region 상단 Condition 영역 Event
        //화면 초기화
        private void btnInit_Click(object sender, EventArgs e)
        {
            //화면을 초기화 하시겠습니까?
            frmMessage frm = new frmMessage("Do you want to reset the screen?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                init();
            }
        }

        public void init()
        {
            grdMain.RemoveAll();
            grdSplitRow.RemoveAll();
            _gridDt.Clear();
            txtSN.Text = "";
            lbl_ganbanId.Text = "";
            lbl_qty.Text = "";
            loc.Text = "";
            ganbanFlag = "N";
            lbl_splitQty.Text = "";

            txtSN_Focus();
        }

        private void btn_set_Click(object sender, EventArgs e)
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        //바코드 입력
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
                    search_header();
                }
                txtSN_Focus();
            }
        }

        private void txtSN_Leave(object sender, EventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Red;
            }
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Yellow;
            }
        }

        //바코드 입력창 포커싱
        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        // 분할 수량 클릭
        private void splitQty_Click(object sender, EventArgs e)
        {
            if (ganbanFlag != "Y")
            {
                //사용불가 처리된 라벨 입니다.
                frmMessage frm1 = new frmMessage("This label has been disabled.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            } else
            {
                keypadEvent(lbl_splitQty);
            }
        }

        // 바코드 재발행
        private void btn_reprint_Click(object sender, EventArgs e)
        {

        }
        #endregion

        #region 하단 Condition 영역 Event
        private void btn_split_Click(object sender, EventArgs e)
        {
            ganban_split(false);
        }

        private void btn_split_all_Click(object sender, EventArgs e)
        {
            ganban_split(true);
        }
        #endregion

        #region 라벨 스캔 Event
        // 상단 라벨 정보 조회
        private void search_header()
        {
            string ganban = "";
            ganban = txtSN.Text.Trim();

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("GANBAN_ID", ganban);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable ganHeadDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganbanSplitHead.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (ganHeadDt == null)
            {
                // 입력한 간판번호가 존재하지 않거나 사용 불가 처리된 간판라벨입니다.
                frmMessage frm1 = new frmMessage("No GANBAN number entered or GANBAN label not available.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganHeadDt.Rows.Count == 0)
            {
                // 입력한 간판번호가 존재하지 않거나 사용 불가 처리된 간판라벨입니다.
                frmMessage frm1 = new frmMessage("No GANBAN number entered or GANBAN label not available.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            lbl_qty.Text = ganHeadDt.Rows[0]["GOODQTY"].ToString();
            loc.Text = ganHeadDt.Rows[0]["SLOC"].ToString();
            lbl_ganbanId.Text = ganHeadDt.Rows[0]["GANBANID"].ToString();
            ganbanFlag = ganHeadDt.Rows[0]["USEYN"].ToString();
            grdSplitRow_init();
            search_body();
        }

        // 하단 Grid 조회
        private void search_body()
        {
            string ganban = "";
            ganban = txtSN.Text.Trim();

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("GANBAN_ID", ganban);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganbanSplitBody.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (ganBodyDt == null)
            {
                //입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.
                frmMessage frm1 = new frmMessage("No GANBAN number entered or GANBAN label not available.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganBodyDt.Rows.Count == 0)
            {
                //입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.
                frmMessage frm1 = new frmMessage("No GANBAN number entered or GANBAN label not available.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            grdMain.DataBindDataSource(ganBodyDt, false, false);

            _gridDt = ganBodyDt;
        }
        #endregion

        #region 내부 Event
        private void keypadEvent(Label keypadLabel)
        {

            if (lbl_ganbanId.Text == "")
            {
                keypadLabel.Text = "0";
                //간판 라벨 조회 후 입력 하세요.
                frmMessage frm1 = new frmMessage("Enter after searching the GANBAN label.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (keypadLabel.Text.Trim() == "")
            {
                keypadLabel.Text = "0";
            }

            clsStatic._dialogValue = "";

            frmLoginIDInsertDouble frm = new frmLoginIDInsertDouble(keypadLabel.Text.Trim());
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                keypadLabel.Text = double.Parse(clsStatic._dialogValue).ToString("######.##");
                clsStatic._dialogValue = "";
            }
        }

        private void ganban_split(bool splitFlag)
        {
            if (lbl_ganbanId.Text == "")
            {
                //간판 라벨 조회 후 분할 가능합니다.
                frmMessage frm1 = new frmMessage("It is possible to divide after GANBAN label inquiry.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (splitFlag == true && (lbl_splitQty.Text == "" || lbl_splitQty.Text.Equals("0")))
            {
                //분할 수량을 입력해 주세요.
                frmMessage frm1 = new frmMessage("Please enter a split quantity.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (!ganbanFlag.Equals("Y"))
            {
                //사용불가 처리된 라벨 입니다.
                frmMessage frm1 = new frmMessage("This label has been disabled.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (splitFlag == true && (int.Parse(lbl_qty.Text.ToString()) <= double.Parse(lbl_splitQty.Text.ToString())))
            {
                //분할 수량은 총 수량을 넘거나 같을 수 없습니다.
                frmMessage frm1 = new frmMessage("The split quantity cannot be greater than or equal to the total quantity.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (splitFlag == false && grdSplitRow.Rows.Count == 0)
            {
                //분할 수량을 입력해 주세요.
                frmMessage frm1 = new frmMessage("Please enter a split quantity.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string retbuf = "";
            retbuf = get_ganbanSeq();

            if (retbuf == "NG")
            {
                //현재 라벨발행 진행중입니다.
                frmMessage frm1 = new frmMessage("Label is currently being published.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }
            //간판라벨발행을 분할을 실행 하시겠습니까?(분할수량 기준)
            frmMessage frm = new frmMessage("Do you want to split the GANBAN label issue?(Split quantity basis)", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            try
            {
                if (result == DialogResult.OK)
                {
                    // 일괄 분할 처리
                    if (splitFlag)
                    {
                        double pollibleQty = double.Parse(lbl_qty.Text.ToString());
                        double splitqty = double.Parse(lbl_splitQty.Text.ToString());
                        int makeqty = Convert.ToInt32(pollibleQty / splitqty);
                        double etc = pollibleQty % splitqty;

                        for (int j = 0; j < makeqty; j++)
                        {
                            make_split(retbuf, splitqty, lbl_ganbanId.Text.ToString());
                            Thread.Sleep(500);
                        }

                        if (etc > 0)
                        {
                            make_split(retbuf, etc, lbl_ganbanId.Text.ToString());
                        }

                    }
                    // 분할 처리
                    else
                    {
                        if (grdSplitRow.Rows.Count > 0)
                        {
                            for (int i = 0; i < grdSplitRow.Rows.Count; i++)
                            {
                                double qty = double.Parse(grdSplitRow["Qty", i].Value.ToString());
                                make_split(retbuf, qty, lbl_ganbanId.Text.ToString());
                            }
                            //double pollibleQty = double.Parse(lbl_qty.Text.ToString());
                            //double splitqty = double.Parse(lbl_splitQty.Text.ToString());
                            //double etc = pollibleQty - splitqty;

                            //make_split(retbuf, splitqty, lbl_ganbanId.Text.ToString());
                            //Thread.Sleep(500);
                            //make_split(retbuf, etc, lbl_ganbanId.Text.ToString());
                            double remain = double.Parse(textBox2.Text.ToString());

                            if (remain > 0)
                            {
                                make_split(retbuf, remain, lbl_ganbanId.Text.ToString());
                            }

                            grdSplitRow_init();
                        } else
                        {
                            //분할 수량을 입력해 주세요.
                            frmMessage frm1 = new frmMessage("Please enter a split quantity.", "AUTOCLOSE");
                            frm1.ShowDialog();
                            txtSN_Focus();
                            return;
                        }
                    }
                }
            } catch (Exception ex)
            {
                delete_ganban_tmp(retbuf);
                //라벨 발행에 실패했습니다.
                frmMessage frm1 = new frmMessage("Failed to publish label", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            ganban_print(retbuf);

            search_header();
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

        private void make_split(string labelid, double splitQty, string ganbanId)
        {
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
            paramsMap.Add("P_GOOD_QTY", splitQty);
            paramsMap.Add("P_DESCRIPTION", "from Split");
            paramsMap.Add("P_PA_GANBAN_ID", ganbanId);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbansplit_proc_new.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (ganbanAddDt == null)
            {
                //간판라벨 생성이 실패했습니다.
                frmMessage frm1 = new frmMessage("GANBAN Label creation failed.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows.Count == 0)
            {
                //간판라벨 생성이 실패했습니다.
                frmMessage frm1 = new frmMessage("GANBAN Label creation failed.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
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
                //출력할 간판라벨이 없습니다.
                frmMessage frm1 = new frmMessage("There are no GANBAN labels to print.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (checkDt.Rows.Count <= 0)
            {
                //출력할 간판라벨이 없습니다.
                frmMessage frm1 = new frmMessage("There are no GANBAN labels to print.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            for (int i = 0; i < checkDt.Rows.Count; i++)
            {
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", "", checkDt.Rows[i]["GANBANID"].ToString(), checkDt.Rows.Count, i, "", ref _BasicDs);
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





        #endregion

        private void textBox1_KeyPress(object sender, KeyPressEventArgs e)
        {
            // accept only digit(0-9) with ‘.’ (dot) and ‘-‘ (minus)
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar) && e.KeyChar != '.' && e.KeyChar != '-')
                e.Handled = true;

            // accept only one decimal point (.32)
            if (e.KeyChar == '.' && (sender as TextBox).Text.IndexOf('.') > -1)
                e.Handled = true;

            // accept only minus sign at the beginning
            if (e.KeyChar == '-' && (sender as TextBox).Text.Length > 0)
                e.Handled = true;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (lbl_ganbanId.Text == "")
            {
                //간판 라벨 조회 후 입력 하세요.
                frmMessage frm1 = new frmMessage("Enter after searching the GANBAN label.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganbanFlag != "Y")
            {
                //사용불가 처리된 라벨 입니다.
                frmMessage frm1 = new frmMessage("This label has been disabled.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            double totalSplitQty = 0;
            double ganbanQty = double.Parse(lbl_qty.Text.ToString());
            double splitQty = double.Parse(textBox1.Text);
            double remainQty = 0;

            if (grdSplitRow.Rows.Count > 0)
            {
                for (int i = 0; i < grdSplitRow.Rows.Count; i++)
                {
                    totalSplitQty = totalSplitQty + double.Parse(grdSplitRow["Qty", i].Value.ToString());
                }
            }

            if (ganbanQty < totalSplitQty + splitQty)
            {
                //분할수량은 총수량을 넘을 수 없습니다.
                frmMessage frm1 = new frmMessage("Split QTY cannot exceed GANBAN QTY.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            } else
            {
                remainQty = ganbanQty - (totalSplitQty + splitQty);
            }

            int seq = 0;
            if (splitQty > 0)
            {
                if (grdSplitRow.Rows.Count > 0)
                {
                    seq = grdSplitRow.Rows.Count;
                }

                grdSplitRow.Rows.Add();
                int nownow = grdSplitRow.Rows.Count - 1;

                grdSplitRow["Seq", nownow].Value = seq.ToString();
                grdSplitRow["Qty", nownow].Value = textBox1.Text;

                textBox1.Text = "0";
                textBox2.Text = remainQty.ToString();
            } else
            {
                return;
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            grdSplitRow_init();
        }

        private void grdSplitRow_init()
        {
            if (lbl_ganbanId.Text == "")
            {
                return;
            }
            grdSplitRow.RemoveAll();
            textBox2.Text = lbl_qty.Text;
        }
    }
}
