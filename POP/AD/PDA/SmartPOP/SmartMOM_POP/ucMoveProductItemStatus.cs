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

            btnSet_Click(null, null);
        }

        private void InitMainList()
        {
            //                                   0         1           2               6         
            string[] headerText = new string[] { "품목",   "품명",     "입고일",       "수량"    }; //9
            string[] columnName = new string[] { "ITEMID", "ITEMNAME", "UPDATEDATE",   "QTY"     };
            string[] columnType = new string[] {  "T",     "T",        "T",            "T"       };
                                                                                                 
            int[] columnWidth    = new int[]   {  200,      500,       220,            256       };
            bool[] columnVisible = new bool[]  {  true,     true,      true,           true      };
            bool[] columnDisable = new bool[]  {  true,     true,      true,           true      };
            string[] cellAlign = new string[]  { "L",       "L",       "C",            "R"       };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 12, FontStyle.Bold);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 80;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void btnAllSearch_Click(object sender, EventArgs e)
        {
            search_process(txtSN.Text);
            txtSN_Focus();
        }

        public void search_process(string sn)
        {
            string retvalue = "";
            string itemtype = "";

            if(clsStatic._ITEMTYPE != "ALL")
            {
                itemtype = clsStatic._ITEMTYPE;
            }


            string itemId = "";
            string ganbanId = "";

            if (sn.Length == 8)
            {
                ganbanId = sn;
            }
            else
            {
                itemId = sn;
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("LOCATION_CD", clsStatic._FROMLINE);
            paramsMap.Add("ITEM_ID", itemId);
            paramsMap.Add("GANBAN_ID", ganbanId);

            paramsList.Add(paramsMap);

            DataTable stockDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getItemBinPosition.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            if (stockDt == null)
            {
                frmMessage frm = new frmMessage("현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 라벨/제품이 존재하지 않습니다.", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (stockDt.Rows.Count <= 0)
            {
                frmMessage frm = new frmMessage("현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 라벨/제품이 존재하지 않습니다.", "AUTOCLOSE");
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
                search_process(txtSN.Text);
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
