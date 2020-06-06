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

namespace SmartMOM_POP
{
    public partial class ucMoveProductItemStatus : UserControl
    {

        public ucMoveProductItemStatus()
        {
            InitializeComponent();


            InitMainList();
        }

        private void InitMainList()
        {
            //                                   0         1           2               3             4             5        6                7                8             
            string[] headerText = new string[] { "품목",   "품명",     "품목타입명",   "현재고",     "이전재고",   "단위",  "규격",          "유무상구분",    "비고"          }; //9
            string[] columnName = new string[] { "ITEMID", "ITEMNAME", "ITEMTYPENAME", "CURRENTQTY", "PREVQTY",    "UNIT",  "SPECIFICATION", "FREEOFFERNAME", "DESCRIPTION"   };
            string[] columnType = new string[] {  "T",     "T",        "T",            "T",          "T",          "T",     "T",             "T",             "T"             };
                                                                                                                                                     
            int[] columnWidth    = new int[]   {  165,      500,       190,            90,           150,          90,      256,              160,            255             };
            bool[] columnVisible = new bool[]  {  true,     true,      true,           true,         true,         true,    true,             true,           true            };
            bool[] columnDisable = new bool[]  {  true,     true,      true,           true,         true,         true,    true,             true,           true            };
            string[] cellAlign = new string[]  { "L",       "L",       "C",            "R",          "R",          "C",     "L",              "C",            "C"             };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 12, FontStyle.Bold);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 70;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void btnAllSearch_Click(object sender, EventArgs e)
        {
            search_process("", "0", "", "", "");
            txtSN_Focus();
        }

        private void search_process(string item_id, string scanqty, string ganban, string pallet, string ct)
        {
            string retvalue = "";
            string itemtype = "";

            if(clsStatic._ITEMTYPE != "ALL")
            {
                itemtype = clsStatic._ITEMTYPE;
            }


            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD",  clsStatic._COMPANY_CD);
            paramsMap.Add("stockType",   clsStatic._STOCK_TYPE);
            paramsMap.Add("LOCATION_CD", clsStatic._FROMLINE);
            paramsMap.Add("ITEM_ID",     item_id);
            paramsMap.Add("GANBAN_ID",   ganban);
            paramsMap.Add("PALLETID",    pallet);
            paramsMap.Add("CT",          ct);
            paramsMap.Add("SCANQTY",     scanqty);
            paramsMap.Add("zeroFlag", "");

            paramsList.Add(paramsMap);

            DataTable stockDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getlocationitem.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            if (stockDt == null)
            {
                frmMessage frm = new frmMessage("현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않습니다. 라벨정보를 확인하여 주세요!", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (stockDt.Rows.Count <= 0)
            {
                frmMessage frm = new frmMessage("현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않습니다. 라벨정보를 확인하여 주세요!", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            grdMain.DataBindDataSource(stockDt, false, false);
        }

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if(txtSN.Text.Trim() == "")
                {
                    return;
                }

                string labeltype = txtSN.Text.Trim().Substring(0, 1);
                string sn = "";
                string ct = "";
                string palletid = "";
                string item_id = "";

                sn = txtSN.Text.Trim();
                

                if (txtSN.Text.Trim().Length > 8)
                {
                    sn = sn.Substring(sn.Length - 8, 8);
                    string snlabeltype = sn.Substring(0, 1);

                    if (snlabeltype == "C")
                    {
                        labeltype = "CT";
                        palletid = "";
                        item_id = "";

                        search_process("", "0", "", "", sn);

                        txtSN_Focus();
                        return;
                    }
                }

                if (txtSN.Text.Trim().Length == 8)
                {
                    if (labeltype == "C")
                    {
                        labeltype = "CT";
                        ct = txtSN.Text.Trim();
                        palletid = "";
                        item_id = "";

                        search_process("", "0", "", "", txtSN.Text);
                    }

                    else if (labeltype == "P")
                    {
                        labeltype = "PALLET";
                        ct = "";
                        palletid = txtSN.Text.Trim();
                        item_id = "";

                        search_process("", "0", "", txtSN.Text, "");
                    }
                    else if (labeltype == "K")
                    {
                        labeltype = "GANBAN";
                        string retvalue = "";

                        ct = "";
                        palletid = "";
                        search_process("", "0", txtSN.Text, "", "");
                    }
                    item_id = toItemid(labeltype);
                }
                else if (txtSN.Text.Trim().Length > 8)
                {
                    labeltype = "CT";
                    ct = txtSN.Text.Trim().Substring(txtSN.Text.Trim().Length - 8, 8);
                    txtSN.Text = ct;
                    palletid = "";
                    item_id = toItemid(labeltype);
                }
                else
                {
                    labeltype = "ITEM";
                    sn = "";
                    ct = "";
                    palletid = "";
                    item_id = txtSN.Text.Trim();
                    search_process(item_id, "0", "", "", "");
                }
                txtSN_Focus();
            }
        }

        private string toItemid(string labeltype)
        {
            string item_id = "";
            string retvalue = "";
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            DataTable dt = new DataTable();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            if (labeltype == "GANBAN")
            {
                paramsMap.Add("GANBAN_ID", txtSN.Text.Trim());
            }
            else
            {
                paramsMap.Add("SN", txtSN.Text.Trim());
            }

            paramsList.Add(paramsMap);

            if (labeltype == "GANBAN")
            {
                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganban2item.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }
            else
            {
                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ct2item.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }

            if (dt == null)
            {
                return "";
            }

            if (dt.Rows.Count == 0)
            {
                return "";
            }

            item_id = dt.Rows[0]["ITEMID"].ToString().Trim();

            return item_id;
        }


        private void txtSN_Leave(object sender, EventArgs e)
        {
            txtSN.BackColor = Color.Red;
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            txtSN.BackColor = Color.Yellow;
        }

        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }
    }
}
