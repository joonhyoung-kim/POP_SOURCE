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
    public partial class frmProductGI : Form
    {
        string _gicode = "";

        public frmProductGI()
        {
            InitializeComponent();

            string retvalue = "";
            List<Dictionary<string, object>> paramsCTList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCTMap = new Dictionary<string, object>();
            paramsCTMap.Add("p_err_code", "");
            paramsCTList.Add(paramsCTMap);

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getgidate.dummy", paramsCTList, clsStatic._serviceSelectURL, ref retvalue);
            if (dt.Rows.Count > 0)
            {
                lblCNTRDate.Text = dt.Rows[0]["GIDISPLAY"].ToString();
                _gicode = dt.Rows[0]["GIVALUE"].ToString();
            }

            lblGIstock.Text = clsStatic._FROMLINE_DESC + "(" + clsStatic._FROMLINE + ")";
            lblUsername.Text = clsStatic._USER_NAME;

            InitPalletList();

            try
            {
                string conBuf = "";
                DataSet ds = clsUtil.form_load("출하처리", ref conBuf);

                if (ds != null)
                {
                    clsUtil.bindGrid(ds.Tables["출하처리"], ref grdGI);
                }

                if (conBuf != "")
                {
                    string[] strs = conBuf.Split('|');

                    for (int i = 0; i < strs.Length; i++)
                    {
                        string[] buf = strs[i].Split('^');

                        if (buf[0] == "gicode")
                        {
                            _gicode = buf[1];
                            continue;
                        }

                        if (buf[0] == "gicntrdate")
                        {
                            lblCNTRDate.Text = buf[1];
                            continue;
                        }

                        if (buf[0] == "txtCNTR")
                        {
                            txtCNTR.Text = buf[1];
                            continue;
                        }
                    }


                }
            }
            catch{ }
            txtSN_Focus();
        }

        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        private void InitPalletList()
        {
            //                                   0      1              2               3              4          5             6           7          8           
            string[] headerText = new string[] { "NO",  "팔레트번호",  "박스포장번호",  "W/O",         "P/NO",    "ORDER_QTY", "QTY",     "출하여부", "ECO"        }; //9
            string[] columnName = new string[] { "NO",  "PALLETID",    "CT",            "WORKORDERID", "ITEMID",  "SUMQTY",    "GOODQTY", "GICHECK", "WOSPEC" };
            string[] columnType = new string[] {  "T",  "T",           "T",            "T",           "T",       "T",         "T",       "T",        "T"          };
                                                                                                                                                                 
            int[] columnWidth    = new int[]   {  70,   180,           180,            200,           250,       210,         210,       250,        250          };
            bool[] columnVisible = new bool[]  {  true, true,          true,           true,          true,      true,        true,      true,       true         };
            bool[] columnDisable = new bool[]  {  true, true,          true,           true,          true,      true,        true,      true,       true         };
            string[] cellAlign = new string[]  { "C",   "C",           "C",            "C",           "C",       "C",         "C",       "C",        "C"          };

            grdGI.SetBorderAndGridlineStyles();
            grdGI.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGI.DefaultCellStyle.Font = new Font("맑은고딕", 14F, FontStyle.Bold);
            grdGI.RowTemplate.Height = 80;

            grdGI.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdGI.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
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

        private string dup_check(string type, string value)
        {
            string retbuf = "OK";

            for (int i = 0; i < grdGI.RowCount; i++)
            {
                if(type == "P")
                {
                    if (grdGI["팔레트번호", i].Value.ToString() == value)
                    {
                        retbuf = "DUP";
                        break;
                    }
                }
                else
                {
                    if (grdGI["박스포장번호", i].Value.ToString() == value)
                    {
                        retbuf = "DUP";
                        break;
                    }
                }
            }

            return retbuf;
        }

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if(txtCNTR.Text == "")
                {
                    frmMessage frm1 = new frmMessage("차량번호(CNTR)를 입력하여 주세요.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                if (txtSN.Text.Trim().Length != 8)
                {
                    frmMessage frm2 = new frmMessage("팔레트번호, 박스포장번호만 입력 가능합니다.", "AUTOCLOSE");
                    frm2.ShowDialog();
                    txtSN_Focus();
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

                string dupcheck = dup_check(sncode, txtSN.Text.Trim());

                if(dupcheck == "DUP")
                {
                    frmMessage frm3 = new frmMessage("이미 스캔된 라벨입니다.", "AUTOCLOSE");
                    frm3.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                string pallet = "";
                string ct = "";
                string strclass = "";

                if (sncode == "P")
                {
                    pallet = txtSN.Text.Trim();
                    ct = "";
                    strclass = "com.thirautech.mom.pop.popResult.getgipalletlist.dummy";
                }
                else
                {
                    pallet = "";
                    ct = txtSN.Text.Trim();
                    strclass = "com.thirautech.mom.pop.popResult.getgictlist.dummy";
                }

                string retvalue = "";
                List<Dictionary<string, object>> paramsCTList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsCTMap = new Dictionary<string, object>();
                paramsCTMap.Add("p_err_code", "");
                paramsCTMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsCTMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsCTMap.Add("PALLETID", pallet);
                //paramsCTMap.Add("PALLETID", "PL3C0005|PL3D0006");
                paramsCTMap.Add("CT", ct);

                paramsCTList.Add(paramsCTMap);

                DataTable ctDt = clsUtil.GetServiceData(strclass, paramsCTList, clsStatic._serviceSelectURL, ref retvalue);
                if (ctDt.Rows.Count <= 0)
                {
                    frmMessage frm = new frmMessage("존재하지 않는 제품입니다.", "AUTOCLOSE");
                    frm.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                if(ctDt.Rows[0]["GICHECK"].ToString() != "")
                {
                    frmMessage frm = new frmMessage("이미 출하 처리된 제품입니다. 확인 하세요.", "AUTOCLOSE");
                    frm.ShowDialog();
                }

                grdGI.Rows.Insert(0, 1);
                int nownow = grdGI.Rows.Count;

                grdGI["NO", 0].Value = nownow.ToString();
                grdGI["팔레트번호", 0].Value = ctDt.Rows[0]["PALLETID"].ToString();
                grdGI["박스포장번호", 0].Value = ctDt.Rows[0]["CT"].ToString();
                grdGI["W/O", 0].Value       = ctDt.Rows[0]["PRODUCTORDERID"].ToString();
                grdGI["P/NO", 0].Value      = ctDt.Rows[0]["ITEMID"].ToString();
                grdGI["ORDER_QTY", 0].Value = ctDt.Rows[0]["ORDERQTY"].ToString();
                grdGI["QTY", 0].Value       = ctDt.Rows[0]["GOODQTY"].ToString();
                grdGI["출하여부", 0].Value  = ctDt.Rows[0]["GICHECK"].ToString();
                grdGI["ECO", 0].Value       = ctDt.Rows[0]["WOSPEC"].ToString();

                grdGI_SumProcess();

                

                btnPreCancel.Enabled = true;
                btnPreCancel.BackColor = Color.LightSalmon;
                txtSN.Text = "";
                txtSN_Focus();
            }
        }

        private DataSet makeDs(ExGrid grid, string gridname)
        {
            DataSet retDs = new DataSet();

            retDs.Namespace = "출하처리";
            retDs.Tables.Add(gridname);

            for (int i = 0; i < grid.ColumnCount; i++)
            {
                retDs.Tables["출하처리"].Columns.Add(grid.Columns[i].Name);
            }

            for (int i=0;i<grid.Rows.Count;i++)
            {
                retDs.Tables["출하처리"].Rows.Add();
                for (int j = 0; j < grid.ColumnCount; j++)
                {
                    retDs.Tables["출하처리"].Rows[i][j] = grdGI[j, i].Value;
                }
            }

            return retDs;
        }


        private void grdGI_SumProcess()
        {
            int sumbuf = 0;
            for (int i = grdGI.RowCount - 1; i >= 0; i--)
            {
                grdGI["NO", i].Value = (i + 1).ToString();
                sumbuf += int.Parse(grdGI["QTY", i].Value.ToString());
            }
            
            for (int i = grdGI.RowCount - 1; i >= 0; i--)
            {
                grdGI["ORDER_QTY", i].Value = sumbuf.ToString();
            }

            string condition = "gicode^" + _gicode + "|gicntrdate^" + lblCNTRDate.Text + "|txtCNTR^" + txtCNTR.Text.Trim();
            DataSet ds = makeDs(grdGI, "출하처리");
            clsUtil.form_save(condition, ds, "출하처리");
        }

        private void chk_select_row(DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0)
            {
                if (grdGI["팔레트번호", e.RowIndex].Style.BackColor == Color.Yellow)
                {
                    for (int j = 0; j < grdGI.ColumnCount; j++)
                    {
                        grdGI[j, e.RowIndex].Style.BackColor = Color.White;
                    }

                }
                else
                {
                    for (int j = 0; j < grdGI.ColumnCount; j++)
                    {
                        grdGI[j, e.RowIndex].Style.BackColor = Color.Yellow;
                    }
                }
            }
        }


        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }

        private void txtSN_Leave(object sender, EventArgs e)
        {
            txtSN.BackColor = Color.Red;
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            txtSN.BackColor = Color.Yellow;
        }

        private void btnPreCancel_Click(object sender, EventArgs e)
        {
            grdGI.Rows.RemoveAt(0);

            grdGI_SumProcess();

            btnPreCancel.Enabled = false;
            btnPreCancel.BackColor = Color.Silver;
        }

        private void btnGIDel_Click(object sender, EventArgs e)
        {
            for (int j = grdGI.RowCount-1; j >= 0; j--)
            {
                if (grdGI["팔레트번호", j].Style.BackColor == Color.Yellow)
                {
                    grdGI.Rows.RemoveAt(j);
                }
            }
            grdGI_SumProcess();
        }

        private void grdGI_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (grdGI.Rows.Count < 1)
            {
                return;
            }

            chk_select_row(e);
        }

        private void init_process()
        {
            txtCNTR.Text = "";
            txtSN.Text = "";
            grdGI.RemoveAll();

            btnPreCancel.Enabled = false;
            btnPreCancel.BackColor = Color.Silver;
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            if (grdGI.RowCount > 0)
            {
                frmMessage frm = new frmMessage("저장안된 자료가 존재합니다. 취소하시겠습니까?", "OK_CANCEL");
                DialogResult result = frm.ShowDialog();

                if (result == DialogResult.No)
                {
                    return;
                }
            }
            init_process();
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            if (grdGI.Rows.Count <= 0)
            {
                txtSN_Focus();
                return;
            }

            frmMessage frm = new frmMessage("입력한 품목들을 출하처리 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.Cancel)
            {
                txtSN_Focus();
                return;
            }

            gi_product();
        }

        private void gi_product()
        {
            string pallet = "";
            string ct = "";
            for(int i=0;i<grdGI.RowCount;i++)
            {
                if (grdGI["팔레트번호", i].Value.ToString().Trim() != "")
                {
                    pallet += grdGI["팔레트번호", i].Value.ToString().Trim() + "|";
                }
                else if (grdGI["박스포장번호", i].Value.ToString().Trim() != "")
                {
                    ct += grdGI["박스포장번호", i].Value.ToString().Trim() + "|";
                }
            }
            if(pallet.Length > 0)
            {
                pallet = pallet.Substring(0, pallet.Length - 1);
            }

            if (ct.Length > 0)
            {
                ct = ct.Substring(0, ct.Length - 1);
            }


            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_PALLETID", pallet);
            paramsMap.Add("P_CT", ct);
            paramsMap.Add("P_GI_CODE", _gicode);
            paramsMap.Add("P_CNTR", txtCNTR.Text.Trim());
            paramsMap.Add("P_GI_DATE_CODE", lblCNTRDate.Text);
            paramsMap.Add("P_UPDATE_BY", clsStatic._USER_ID);
            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.giproduct.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt == null)
            {
                frmMessage frm1 = new frmMessage("출하처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (dt.Rows.Count == 0)
            {
                frmMessage frm2 = new frmMessage("출하처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }

            frmMessage frm3 = new frmMessage("출하처리가 정상적으로 처리었습니다.", "AUTOCLOSE");
            frm3.ShowDialog();
            grdGI.RemoveAll();
            btnPreCancel.Enabled = false;
            btnPreCancel.BackColor = Color.Silver;
            clsUtil.form_delete("출하처리");
            txtSN_Focus();
        }

        private void grdGI_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void lblMessage_Click(object sender, EventArgs e)
        {

        }

        private void txtSN_TextChanged(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void lblUsername_Click(object sender, EventArgs e)
        {

        }

        private void lblCNTRDate_Click(object sender, EventArgs e)
        {

        }

        private void txtCNTR_TextChanged(object sender, EventArgs e)
        {

        }

        private void tableLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void lblGIstock_Click(object sender, EventArgs e)
        {

        }
    }
}
