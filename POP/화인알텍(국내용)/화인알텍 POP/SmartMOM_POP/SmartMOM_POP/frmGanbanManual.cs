using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmGanbanManual : Form
    {
        DataSet _BasicDs = new DataSet();
        DataTable _ganBodyDt = new DataTable();
        string _item_id = "";
        string _stock_id = "";

        public frmGanbanManual(string stocknm, string stock_id)
        {
            InitializeComponent();

            lblToStock.Text = stocknm;
            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);
            _stock_id = stock_id;

            InitGanbanList();
            search_process();
        }

        public frmGanbanManual(string stocknm, string stock_id, string item_id, string qty)
        {
            InitializeComponent();

            lblToStock.Text = stocknm;
            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);

            _stock_id = stock_id;
            txtItem.Text = item_id;
            txtQty.Text = qty;
            string flag = item_search();
            if(flag == "NG")
            {
                return;
            }
            search_process(txtItem.Text.Trim(), "0", "", "", "");
            txtItem.Enabled = false;

            InitGanbanList();
            search_process();
        }

        private void InitGanbanList()
        {
            //                                   0               1                2                3           4             5                   6              7                 8                9                10               11           12             
            string[] headerText = new string[] { "사용여부",     "현재창고",      "간판라벨번호",  "품목",     "구성수량",   "발주번호",         "W/O",         "FROM창고",       "이동일자",      "이동담당자",    "박스포장번호", "생성자",    "생성일자"    }; //13
            string[] columnName = new string[] { "USEYN",        "SLOC",          "GANBANID",      "ITEMID",   "GOODQTY",    "DEPARTUREGROUPID", "WORKORDERID", "FROMSLOC",       "MOVEDATE",      "MOVEBY",        "CT",           "NAME",      "CREATEDATE"  };
            string[] columnType = new string[] { "T",            "T",             "T",             "T",        "T",          "T",                "T",           "T",              "T",             "T",              "T",            "T",         "T"          };
                                                                                                                                                                                                                                                              
            int[] columnWidth    = new int[]   {  150,            250,             200,            300,        150,           250,                200,           250,              250,             250,             150,             200,        250          };
            bool[] columnVisible = new bool[]  {  true,           true,            true,           true,       true,          true,               true,          true,             true,            true,            true,            true,       true         };
            bool[] columnDisable = new bool[]  {  true,           true,            true,           true,       true,          true,               true,          true,             true,            true,            true,            true,       true         };
            string[] cellAlign = new string[]  { "C",             "C",            "C",             "L",        "C",          "C",                 "C",           "C",              "C",             "C",             "C",             "C",        "C"          };
                                                             
            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 25F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 80;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 24F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void search_process()
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("WORK_ORDER_ID", "");
            paramsMap1.Add("PALLETID", "");
            paramsMap1.Add("CT", "");
            paramsMap1.Add("GANBAN_ID", "");
            paramsMap1.Add("DEPARTURE_GROUP_ID", "MANUAL");
            paramsMap1.Add("dateFlag", "Y");
            paramsMap1.Add("USE_YN", "");
            paramsMap1.Add("SLOC", _stock_id);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            _ganBodyDt.Dispose();
            _ganBodyDt = new DataTable();
            _ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanBodyList1.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (_ganBodyDt == null)
            {
                return;
            }

            if (_ganBodyDt.Rows.Count == 0)
            {
                return;
            }

            grdMain.DataBindDataSource(_ganBodyDt, false, false);
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void txtItem_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                item_search_process();
            }
        }

        private void item_search_process()
        {
            if (txtItem.Text.Trim() == "")
            {
                frmMessage frm1 = new frmMessage("품목을 입력하여 주세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }
            else
            {
                string flag = item_search();
                if (flag == "NG")
                {
                    return;
                }
                search_process(txtItem.Text.Trim(), "0", "", "", "");
            }
        }

        private void search_process(string item_id, string scanqty, string ganban, string pallet, string ct)
        {
            string retvalue = "";
            string itemtype = "";

            if (clsStatic._ITEMTYPE != "ALL")
            {
                itemtype = clsStatic._ITEMTYPE;
            }


            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("stockType", clsStatic._STOCK_TYPE);
            paramsMap.Add("LOCATION_CD", clsStatic._FROMLINE);
            paramsMap.Add("ITEM_ID", item_id);
            paramsMap.Add("GANBAN_ID", ganban);
            paramsMap.Add("PALLETID", pallet);
            paramsMap.Add("CT", ct);
            paramsMap.Add("SCANQTY", scanqty);
            paramsMap.Add("zeroFlag", "");

            paramsList.Add(paramsMap);

            DataTable stockDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getlocationitem.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            if (stockDt == null)
            {
                frmMessage frm = new frmMessage("현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않습니다. 라벨정보를 확인하여 주세요!", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            if (stockDt.Rows.Count <= 0)
            {
                frmMessage frm = new frmMessage("현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않습니다. 라벨정보를 확인하여 주세요!", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            _item_id = txtItem.Text;

            if(stockDt == null)
            {
                lblCQTY.Text = "0";
            }
            else
            {
                lblCQTY.Text = int.Parse(stockDt.Rows[0]["CURRENTQTY"].ToString()).ToString("#,##0");
            }
            
        }


        private string item_search()
        {
            string retbuf = "OK";
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap1.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap1.Add("itemId", txtItem.Text);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable itemDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_itemone.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (itemDt == null)
            {
                frmMessage frm1 = new frmMessage("존재하재 않는 품번입니다. 정확한 품번을 입력하여 주세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                return "NG";
            }

            if (itemDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("존재하재 않는 품번입니다. 정확한 품번을 입력하여 주세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                return "NG";
            }

            if (clsStatic._STOCK_TYPE_NAME == "재고이동" ||
               clsStatic._STOCK_TYPE_NAME == "자재반납" ||
               clsStatic._STOCK_TYPE_NAME == "공정이동" ||
               clsStatic._STOCK_TYPE_NAME == "제품이동")
            {
                if (itemDt.Rows.Count > 0)
                {
                    DataRow[] drs = clsStatic._moveitemDt.Select("CODE = '" + itemDt.Rows[0]["ITEMTYPE"].ToString() + "'");
                    if (drs.Length == 0)
                    {
                        string message = clsStatic._STOCK_TYPE_NAME + "에서는 간판생성이 불가능한 품목입니다.(가능품목:";

                        string message1 = "";
                        for (int i = 0; i < clsStatic._moveitemDt.Rows.Count; i++)
                        {
                            if(clsStatic._moveitemDt.Rows[i]["CODE"].ToString() == "ALL")
                            {
                                continue;
                            }
                            message1 += clsStatic._moveitemDt.Rows[i]["NAME"].ToString() + ",";
                        }
                        if (message1.Length > 0)
                        {
                            message1 = message1.Substring(0, message1.Length - 1) + ")";
                        }
                        message += message1;

                        frmMessage frm = new frmMessage(message, "OK");
                        frm.ShowDialog();
                        return "NG";
                    }
                }
            }

            _item_id = txtItem.Text;

            lblItemNm.Text = itemDt.Rows[0]["ITEMNAME"].ToString();

            return retbuf;
        }

        private void txtQty_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!(char.IsDigit(e.KeyChar) || e.KeyChar == Convert.ToChar(Keys.Back)))
            {
                e.Handled = true;
            }
        }

        private void btnMake_Click(object sender, EventArgs e)
        {
            if (lblItemNm.Text.Trim() == "")
            {
                frmMessage frm1 = new frmMessage("품목검색을 먼저 실행하여 주세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (txtQty.Text.Trim() == "" || txtQty.Text.Trim() == "0")
            {
                frmMessage frm1 = new frmMessage("정확한 수량을 입력하여 주세요", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (int.Parse(txtQty.Text.Trim()) == 0)
            {
                frmMessage frm2 = new frmMessage("정확한 수량을 입력하여 주세요", "AUTOCLOSE");
                frm2.ShowDialog();
                return;
            }

            if (int.Parse(txtQty.Text.Trim()) > int.Parse(lblCQTY.Text.Trim().Replace(",", "")))
            {
                frmMessage frm3 = new frmMessage("현재 창고내 재고수량 이상으로 간판발행이 불가능합니다.", "AUTOCLOSE");
                frm3.ShowDialog();
                return;
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ganbanid", "");
            paramsMap.Add("P_DIVISION_CD",        clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD",         clsStatic._COMPANY_CD);
            paramsMap.Add("P_ITEM_ID",            _item_id);
            paramsMap.Add("P_DEPARTURE_GROUP_ID", "MANUAL");
            paramsMap.Add("P_WORK_ORDER_ID",      "-");
            paramsMap.Add("P_PALLETID",           "-");
            paramsMap.Add("P_CT",                 "-");
            paramsMap.Add("P_GOOD_QTY",           txtQty.Text);
            paramsMap.Add("P_FROM_SLOC",          "-");
            paramsMap.Add("P_SLOC",               _stock_id);
            paramsMap.Add("P_VENDOR_CD",          "-");
            paramsMap.Add("P_DESCRIPTION",        "Manual 생성");
            paramsMap.Add("P_PA_GANBAN_ID",       "-");
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbaninsert_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (ganbanAddDt == null)
            {
                frmMessage frm2 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm2.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows.Count == 0)
            {
                frmMessage frm3 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm3.ShowDialog();
                return;
            }

            ganban_print(ganbanAddDt.Rows[0]["p_ganbanid"].ToString());

            frmMessage frm4 = new frmMessage("간판라벨 이 정상적으로 발행되었습니다..(" + ganbanAddDt.Rows[0]["p_ganbanid"].ToString() + ")", "AUTOCLOSE");
            frm4.ShowDialog();

            search_process();
        }

        private void ganban_print(string ganbanid)
        {
            clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", "", ganbanid, "", ref _BasicDs);
        }

        private void label2_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmKeyboard frm = new frmKeyboard(txtItem.Text);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                clsStatic._PERSONCOUNT = clsStatic._dialogValue;

                txtItem.Text = clsStatic._dialogValue;

                item_search();

                clsStatic._dialogValue = "";
            }
        }

        private void label3_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(txtQty.Text);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                clsStatic._PERSONCOUNT = clsStatic._dialogValue;

                txtQty.Text = clsStatic._dialogValue;

                clsStatic._dialogValue = "";
            }
        }

        private void btnITEMSearch_Click(object sender, EventArgs e)
        {
            item_search_process();
        }
    }
}
