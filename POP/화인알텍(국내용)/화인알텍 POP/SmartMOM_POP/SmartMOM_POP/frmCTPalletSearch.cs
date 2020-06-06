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
    public partial class frmCTPalletSearch : Form
    {
        DataTable _bindDt = new DataTable();
        public frmCTPalletSearch()
        {
            InitializeComponent();

            InitPalletList();
        }

        private void InitPalletList()
        {
            //                                   0            1               2             3             4                 5               6           7         8                 9           
            string[] headerText = new string[] { "박스번호",  "박스포장일자", "박스생산자", "팔레트번호", "팔레트포장일자", "팔레트생성자", "출하일자", "출하자", "차량번호(CNTR)", "제품ID"            }; //10
            string[] columnName = new string[] { "CT",        "CTDATE",       "CTUSER",     "PALLETID",   "PALLETDATE",     "PALLETUSER",   "GIDATE",   "GIUSER", "CNTR",           "WORKORDERRESULTID" };
            string[] columnType = new string[] {  "T",        "T",             "T",         "T",           "T",             "T",            "T",        "T",      "T",              "T"                 };
                                                                                                                                                                                                    
            int[] columnWidth    = new int[]   {  140,        205,             140,         140,           205,             150,            205,        110,      200,              250                 };
            bool[] columnVisible = new bool[]  {  true,       true,            true,        true,          true,            true,           true,       true,     true,             true                };
            bool[] columnDisable = new bool[]  {  true,       true,            true,        true,          true,            true,           true,       true,     true,             true                };
            string[] cellAlign = new string[]  { "C",         "C",             "C",         "C",           "C",             "C",            "C",        "C",      "C",              "C"                 };

            grdSearch.SetBorderAndGridlineStyles();
            grdSearch.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdSearch.DefaultCellStyle.Font = new Font("맑은고딕", 14F, FontStyle.Bold);
            grdSearch.RowTemplate.Height = 60;

            grdSearch.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdSearch.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("프로그램을 종료 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                this.Close();
            }
        }

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if(txtSN.Text.Trim().Length < 8)
                {
                    return;
                }
                string sncode = txtSN.Text.Trim().Substring(0, 1);
                if (sncode != "C" && sncode != "P")
                {
                    frmMessage frm3 = new frmMessage("팔레트번호, 박스포장번호만 입력 가능합니다.", "AUTOCLOSE");
                    frm3.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                string pallet = "";
                string ct = "";

                if (sncode == "P")
                {
                    pallet = txtSN.Text.Trim();
                    ct = "";
                }
                else
                {
                    pallet = "";
                    ct = txtSN.Text.Trim();
                }

                string retvalue = "";
                List<Dictionary<string, object>> paramsCTList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsCTMap = new Dictionary<string, object>();
                paramsCTMap.Add("p_err_code", "");
                paramsCTMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsCTMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsCTMap.Add("PALLETID", pallet);
                paramsCTMap.Add("CT", ct);

                paramsCTList.Add(paramsCTMap);

                _bindDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getsnsearch.dummy", paramsCTList, clsStatic._serviceSelectURL, ref retvalue);
                grdSearch.DataBindDataSource(_bindDt, false, false);
                txtSN_Focus();

            }
        }

        private void txtSN_Leave(object sender, EventArgs e)
        {
            txtSN.BackColor = Color.Red;
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            txtSN.BackColor = Color.Yellow;
        }

        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }

        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }
    }
}
