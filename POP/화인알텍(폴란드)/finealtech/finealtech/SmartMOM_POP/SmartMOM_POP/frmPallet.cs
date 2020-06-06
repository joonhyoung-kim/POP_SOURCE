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
    public partial class frmPallet : Form
    {
        DataSet _BasicDs = new DataSet();

        string _palletid = "";
        string _fromline = "";
        string _toline = "";
        string _itemtype = "";

        public frmPallet(string fromline, string toline, string itemtype)
        {
            InitializeComponent();

            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);

            lblFrom.Text = fromline;
            lblTo.Text = toline;

            _fromline = fromline;
            _toline = toline;
            _itemtype = itemtype;

            InitPalletList();
        }

        private void InitPalletList()
        {
            //                                   0      1               2              3              4           5             
            string[] headerText = new string[] { "SN",  "박스포장번호", "파레트ID",    "W/O",         "구성수량", "생산일자"    }; //6
            string[] columnName = new string[] { "SN",  "CT",           "PALLETID",    "WORKORDERID", "GOODQTY",  "CREATEDATE"  };
            string[] columnType = new string[] {  "T",  "T",             "T",           "T",           "T",        "T"           };

            int[] columnWidth    = new int[]   {  250,   250,            250,           250,          250,        250           };
            bool[] columnVisible = new bool[]  {  true,  true,           true,          true,         true,       true          };
            bool[] columnDisable = new bool[]  {  true,  true,           true,          true,         true,       true          };
            string[] cellAlign = new string[]  { "C",   "C",             "C",           "C",           "C",        "C"           };

            grdPallet.SetBorderAndGridlineStyles();
            grdPallet.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdPallet.DefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdPallet.RowTemplate.Height = 120;

            grdPallet.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdPallet.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
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
                string textSN = txtSN.Text.Trim();
                
                if(textSN.Length == 8)
                {
                    textSN = txtSN.Text.Trim();
                }
                else if (textSN.Length > 8)
                {
                    textSN = txtSN.Text.Trim().Substring(txtSN.Text.Trim().Length - 8, 8);
                }
                else
                {
                    frmMessage frm1 = new frmMessage("정상적인 박스번호를 입력하여 주십시요.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                txtSN.Text = textSN;

                string labeltype = textSN.Substring(0, 1);

                if (labeltype == "G")
                {
                    labeltype = "SN";
                }
                else if (labeltype == "C")
                {
                    labeltype = "CT";
                }

                else if (labeltype == "P")
                {
                    labeltype = "PALLET";
                }

                if (labeltype == "PALLET")
                {
                    search_process(textSN);
                }
                else
                {
                    string sn = "";
                    string ct = "";
                    string grdPalletCheckValue = "";
                    if (labeltype == "SN")
                    {
                        sn = textSN;
                        ct = "";
                        grdPalletCheckValue = grdPalletCheck(textSN, "SN");
                    }
                    else if (labeltype == "CT")
                    {
                        sn = "";
                        ct = textSN;
                        grdPalletCheckValue = grdPalletCheck(textSN, "박스포장번호");
                    }

                    if (grdPalletCheckValue == "NG")
                    {
                        frmMessage frm1 = new frmMessage("이미 입력하신 SN/CT 입니다.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        return;
                    }

                    init_search_process(sn, ct, labeltype);
                }
            }
        }

        private string grdPalletCheck(string value, string colname)
        {
            string retbuf = "OK";

            for (int i = 0; i < grdPallet.Rows.Count; i++)
            {
                if (grdPallet[colname, i].Value.ToString() == value)
                {
                    retbuf = "NG";
                    break;
                }
            }

            return retbuf;
        }

        private void product_insert(string sn, string labeltype, string palletid)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code",  "");
            paramsMap.Add("p_err_msg",   "");
            paramsMap.Add("p_runCount",  "");
            paramsMap.Add("p_palletid",  "");
            paramsMap.Add("p_itemid",    "");
            paramsMap.Add("p_palletqty", "");
            paramsMap.Add("p_message",   "");
            paramsMap.Add("p_division_cd",    clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd",     clsStatic._COMPANY_CD);
            paramsMap.Add("p_labeltype",      labeltype);
            paramsMap.Add("p_sn",             sn);
            paramsMap.Add("p_update_by",      clsStatic._USER_ID);
            paramsMap.Add("p_pre_palletid", palletid);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_palletupsert_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "OK")
            {
                lblItem.Text = dt.Rows[0]["p_itemid"].ToString();
                lblQty.Text = dt.Rows[0]["p_palletqty"].ToString();
                lblPallet.Text = dt.Rows[0]["p_palletid"].ToString();
            }
            //else
            //{
            //    lblMessage.Text = dt.Rows[0]["p_err_msg"].ToString();
            //}

            txtSN_Focus();
        }

        private void btnLabelPrint_Click(object sender, EventArgs e)
        {
            if (grdPallet.Rows.Count > 0)
            {
                _palletid = grdPallet.Rows[0].Cells["파레트ID"].Value.ToString();
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, _palletid, "", "", "", 0, 0, "", ref _BasicDs);

                frmMessage frm1 = new frmMessage("OK버튼을 누르면 제품 재고이동 처리를 진행합니다.", "OK");
                DialogResult result = frm1.ShowDialog();

                //frmMoveProductProcess frm2 = new frmMoveProductProcess(_fromline, _toline, _itemtype, clsStatic._ITEMTYPE, lblPallet.Text);
                //frm2.ShowDialog();
            }
        }

        private void btnInit_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("화면을 초기화 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                init_process();
            }

            txtSN_Focus();
        }

        private void init_process()
        {
            lblItem.Text = "";
            lblQty.Text = "";
            lblPallet.Text = "";
            lblProductOrder.Text = "";
            txtSN.Text = "";
            _palletid = "";

            grdPallet.RemoveAll();

            txtSN_Focus();
        }

        private void search_process(string palletid)
        {
            string retvalue = "";
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("PALLETID", palletid);

            paramsList.Add(paramsMap);

            DataTable palltDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_palletpack_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            grdPallet.DataBindDataSource(palltDt, false, false);

            if(palltDt == null)
            {
                return;
            }
            if (palltDt.Rows.Count > 0)
            {
                lblProductOrder.Text = palltDt.Rows[0]["PRODUCTORDERID"].ToString();
                lblItem.Text   = palltDt.Rows[0]["ITEMID"].ToString();
                lblPallet.Text = palltDt.Rows[0]["PALLETID"].ToString();
                qty_sum();
            }
        }

        private void init_search_process(string sn, string ct, string labeltype)
        {
            string retvalue = "";
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("SN", sn);
            paramsMap.Add("CT", ct);

            paramsList.Add(paramsMap);

            DataTable initDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_palletpack.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if(initDt.Rows.Count > 0)
            {
                if(initDt.Rows[0]["palletid"].ToString() != lblPallet.Text 
                    && lblPallet.Text != ""
                    && initDt.Rows[0]["palletid"].ToString() != "NODATA")
                {
                    frmMessage frm1 = new frmMessage("이미 구성되어 있는 SN/CT 입니다.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }
                else if (initDt.Rows[0]["palletid"].ToString() == "NODATA")
                {
                    if (lblPallet.Text != "NODATA" && lblPallet.Text != "")
                    {
                        string pre_productid = lblProductOrder.Text;
                        string now_productid = initDt.Rows[0]["PRODUCTORDERID"].ToString();

                        if (pre_productid != now_productid)
                        {
                            frmMessage frm = new frmMessage("고객사 P/O가 일치 하지 않는 제품입니다.", "AUTOCLOSE");
                            frm.ShowDialog();
                        }
                        else
                        {
                            insert_pallet(labeltype, ref initDt);
                        }
                    }
                    else
                    {
                        frmMessage frm = new frmMessage("파레트 구성을 진행하시겠습니까?", "OK_CANCEL");
                        DialogResult result = frm.ShowDialog();

                        if (result == DialogResult.OK)
                        {
                            insert_pallet(labeltype, ref initDt);
                        }
                    }
                }
                else
                {
                    search_process(initDt.Rows[0]["PALLETID"].ToString());
                }
            }
            else
            {
                frmMessage frm1 = new frmMessage("존재하지 않는 SN/CT 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
            }
            txtSN_Focus();

        }

        private void insert_pallet(string labeltype, ref DataTable initDt)
        {
            string palletid = "";

            if (lblPallet.Text.Trim() == "")
            {
                palletid = initDt.Rows[0]["palletid"].ToString();
            }
            else
            {
                palletid = lblPallet.Text.Trim();
            }

            product_insert(txtSN.Text, labeltype, palletid);
            search_process(lblPallet.Text);
        }

        private void qty_sum()
        {
            int sum = 0;
            int buf = 0;

            for (int i = 0; i < grdPallet.Rows.Count; i++)
            {
                if (grdPallet["구성수량", i].Value == null)
                {
                    buf = 0;
                }
                buf = int.Parse(grdPallet["구성수량", i].Value.ToString());
                sum += buf;
            }

            lblQty.Text = sum.ToString("###,##0");
        }

        private void txtSN_Leave(object sender, EventArgs e)
        {
            txtSN.BackColor = Color.Red;
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            txtSN.BackColor = Color.Yellow;
        }

        private void pallet_init()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_palletid", lblPallet.Text.Trim());
            paramsMap.Add("p_update_by", clsStatic._USER_ID);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_palletinit_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "OK")
            {
                init_process();
            }

            txtSN_Focus();
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

        private void btnPalletInit_Click(object sender, EventArgs e)
        {
            if (lblPallet.Text == "")
            {
                frmMessage frm1 = new frmMessage("파레트 정보를 조회 후 실행하여 주세요.", "AUTOCLOSE");
                DialogResult result1 = frm1.ShowDialog();
                return;
            }
            frmMessage frm2 = new frmMessage("파레트를 해체 하시겠습니까?", "OK_CANCEL");
            DialogResult result2 = frm2.ShowDialog();

            if (result2 == DialogResult.OK)
            {
                pallet_init();
            }
            txtSN_Focus();
        }
    }
}
