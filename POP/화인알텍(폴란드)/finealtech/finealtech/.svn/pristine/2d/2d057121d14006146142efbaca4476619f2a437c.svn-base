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
    public partial class frmLabelPrintDetail : Form
    {
        string _wocode = "";
        DataTable _id1Dt = new DataTable();
        DataTable _id2Dt = new DataTable();
        DataTable _ganban1Dt = new DataTable();
        DataTable _ganban2Dt = new DataTable();
        DataTable _gt_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();
        DataTable _snDt = new DataTable();
        DataTable _ganbanDt = new DataTable();

        public frmLabelPrintDetail(string resourceId, string resorceName, string pn, string pntext, string spec, string plandate, string wo, string planqty, string ganbanId, string labelId, string wocode, string idrule, string itemtype, string ctqyt)
        {
            InitializeComponent();

            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);

            lblLine.Text       = resourceId + "[" + resorceName + "]";
            lblPN.Text         = pn;
            lblPNDesc.Text     = pntext;
            lblSpec.Text       = spec;
            datePlandate.Value = DateTime.Parse(plandate);
            lblWO.Text         = wo;
            txtPlanQty.Text    = planqty;
            txtPrintQty.Text   = (int.Parse(planqty.Trim().Replace(",", "")) + 20).ToString();
            _wocode            = wocode;
            lblIDRule.Text     = idrule;
            lblItemtype.Text   = itemtype;
            lblPackSize.Text   = ctqyt;

            InitSNLabelList();
            InitGanbanLabelList();

            grdSN.Dock = DockStyle.Fill;
            grdGanban.Dock = DockStyle.Fill;

            label_search("SN", grdSN);
            label_search("GANBAN", grdGanban);

            if (_wocode == "C" || _wocode == "R" || _wocode == "T")
            {
                btnMakeSN.Enabled     = false;
                btnMakeGanban.Enabled = false;
                btnDelSN.Enabled      = false;
                btnDelGanban.Enabled  = false;
            }
            else if(grdSN.Rows.Count > 1)
            {
                del_check_process();
            }

            label_list_search();

            if(labelId.Trim() == "NONE" || labelId.Trim() == "")
            {
                comboID1.SelectedValue = "NONE";
            }
            else
            {
                comboID1.SelectedValue = labelId.Trim();
                comboID1.Enabled = false;
            }

            if (ganbanId.Trim() == "NONE" || ganbanId.Trim() == "")
            {
                comboGanban1.SelectedValue = "NONE";
            }
            else
            {
                comboGanban1.SelectedValue = ganbanId.Trim();
                comboGanban1.Enabled = false;
            }
        }

        private void label_list_search()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            string retvalue = "";

           _id1Dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_label_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            _id2Dt = _id1Dt.Copy();
            _ganban1Dt = _id1Dt.Copy();
            _ganban2Dt = _id1Dt.Copy();

            comboID1.DisplayMember = "LABELDESC";
            comboID1.ValueMember = "LABELID";
            comboID1.DataSource = _id1Dt;

            comboID2.DisplayMember = "LABELDESC";
            comboID2.ValueMember = "LABELID";
            comboID2.DataSource = _id2Dt;

            comboGanban1.DisplayMember = "LABELDESC";
            comboGanban1.ValueMember = "LABELID";
            comboGanban1.DataSource = _ganban1Dt;

            comboGanban2.DisplayMember = "LABELDESC";
            comboGanban2.ValueMember = "LABELID";
            comboGanban2.DataSource = _ganban2Dt;
        }

        private void del_check_process()
        {
            for(int i=0;i<grdSN.Rows.Count;i++)
            {
                string sn_value   = grdSN.Rows[i].Cells["ID"].Value.ToString().Trim();
                string prod_value = grdSN.Rows[i].Cells["PROD.ID"].Value.ToString().Trim();
                if (sn_value == prod_value)
                {
                    btnDelSN.Enabled = false;
                    break;
                }
            }

            for (int i = 0; i < grdGanban.Rows.Count; i++)
            {
                string sn_value   = ToStringValue(grdGanban.Rows[i].Cells["GANBAN ID"].Value);
                string prod_value = ToStringValue(grdGanban.Rows[i].Cells["PROD.GANBAN ID"].Value);
                if (sn_value == prod_value)
                {
                    btnDelGanban.Enabled = false;
                    break;
                }
            }
        }

        private string ToStringValue(object value)
        {
            string retbuf = "";

            if(value == null)
            {
                return retbuf;
            }

            return value.ToString();
        }

        private void InitSNLabelList()
        {
            //                                   0            1      2      3      4           5              6                              
            string[] headerText = new string[] { "Type",      "SEQ", "QTY", "ID", "PROD.ID", "CREATE DATE", "CREATE USER"   }; //7
            string[] columnName = new string[] { "LABELTYPE", "SEQ", "QTY", "SN",  "PRODSN",   "CREATEDATE",  "CREATEBY"      };
                                                                                                            
            string[] columnType = new string[] { "T",         "T",   "T",   "T",   "T",        "T",          "T"              };
            int[] columnWidth    = new int[]   { 70,          70,    70,    220,   220,        145,          110              };
            bool[] columnVisible = new bool[]  { true,        true,  true,  true,  true,       true,         true             };
            bool[] columnDisable = new bool[]  { true,        true,  true,  true,  true,       true,         true             };
            string[] cellAlign = new string[]  { "C",         "C",   "C",   "C",   "C",        "C",          "C"              };

            grdSN.SetBorderAndGridlineStyles();
            grdSN.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdSN.DefaultCellStyle.Font = new Font("맑은고딕", 10F);
            grdSN.RowTemplate.Height = 36;
            //grdSN.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            grdSN.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 10F);
            grdSN.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void InitGanbanLabelList()
        {
            //                                   0            1      2      3             4                  5              6                              
            string[] headerText = new string[] { "Type",      "SEQ", "QTY", "GANBAN ID",  "PROD.GANBAN ID",  "CREATE DATE", "CREATE USER"   }; //7
            string[] columnName = new string[] { "LABELTYPE", "SEQ", "QTY", "GANBANID",   "PRODGANBANID",    "CREATEDATE",  "CREATEBY"      };
                                                                                                           
            string[] columnType = new string[] { "T",         "T",   "T",   "T",          "T",               "T",          "T"              };
            int[] columnWidth    = new int[]   { 70,          70,    70,    160,          160,               145,          110              };
            bool[] columnVisible = new bool[]  { true,        true,  true,  true,         true,              true,         true             };
            bool[] columnDisable = new bool[]  { true,        true,  true,  true,         true,              true,         true             };
            string[] cellAlign = new string[]  { "C",         "C",   "C",   "C",          "C",               "C",          "C"              };

            grdGanban.SetBorderAndGridlineStyles();
            grdGanban.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGanban.DefaultCellStyle.Font = new Font("맑은고딕", 10F);
            grdGanban.RowTemplate.Height = 36;
            //grdGanban.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            grdGanban.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 10F);
            grdGanban.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void label_search(string flag, ExGrid grid)
        {
            string labeltype = "SN";
            if (flag == "GANBAN")
            {
                labeltype = "GANBAN";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap.Add("WORK_ORDER_ID", lblWO.Text.Trim());
            paramsMap.Add("LABELTYPE",     labeltype);
            paramsList.Add(paramsMap);

            string retvalue = "";

            if (flag == "SN")
            {
                _snDt.Dispose();
                _snDt = new DataTable();
                _snDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_makesn_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
                grid.DataBindDataSource(_snDt, true, false);
            }
            else
            {
                _ganbanDt.Dispose();
                _ganbanDt = new DataTable();
                _ganbanDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_makesn_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
                grid.DataBindDataSource(_ganbanDt, true, false);
            }
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnPrint_Click(object sender, EventArgs e)
        {
            frmReport frm = new frmReport();
            frm.ShowDialog();
        }

        private void btnMakeSN_Click(object sender, EventArgs e)
        {
            if(lblIDRule.Text == "BACKCOVER")
            {
                if(comboMold.Text.Trim() == "")
                {
                    frmMessage frm0 = new frmMessage("Mold No.(금형번호)를 입력하여 주세요.", "AUTOCLOSE");
                    frm0.ShowDialog();
                    return;
                }
            }

            if(grdSN.RowCount == 0 && chkID1.Checked == false)
            {
                frmMessage frm0 = new frmMessage("먼저 ID1 Label을 생성하여 주세요.", "AUTOCLOSE");
                frm0.ShowDialog();
                return;
            }

            makesn("SN", grdSN);
        }

        private void btnMakeGanban_Click(object sender, EventArgs e)
        {
            makesn("GANBAN", grdGanban);
        }

        private void makesn(string flag, ExGrid grid)
        {
            int grdrows = grid.Rows.Count;

            if(grdrows > 0)
            {
                frmMessage frm0 = new frmMessage("이미 생성된 SN이 존재합니다.", "AUTOCLOSE");
                frm0.ShowDialog();
                return;
            }

            string labeltype = "SN";
            if (flag == "GANBAN")
            {
                labeltype = "GANBAN";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap.Add("P_ITEM_ID",       lblPN.Text.Trim());
            paramsMap.Add("P_IDLABELRULE1",  lblIDRule.Text.Trim());
            paramsMap.Add("P_IDLABELRULE2",  "111");
            paramsMap.Add("P_Y",             datePlandate.Value.ToString("yyyy").Substring(3, 1));
            paramsMap.Add("P_MM",            datePlandate.Value.ToString("MM"));
            paramsMap.Add("P_DD",            datePlandate.Value.ToString("dd"));
            paramsMap.Add("P_WORK_ORDER_ID", lblWO.Text.Trim());
            paramsMap.Add("P_PLANQTY",       txtPrintQty.Text.Trim().Replace(",", ""));
            paramsMap.Add("P_MOLDNO",        comboMold.Text);
            paramsMap.Add("P_LABELTYPE",     labeltype);
            paramsMap.Add("P_ITEMTYPE",      lblItemtype.Text.Trim());
            paramsMap.Add("P_PACKQTY",       lblPackSize.Text.Trim());
            paramsMap.Add("P_CREATE_BY",     clsStatic._USER_ID);
            paramsList.Add(paramsMap);

            string retvalue = "";
            DataTable snDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_presnganbanmake_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (snDt == null)
            {
                frmMessage frm1 = new frmMessage("SN이 생성되지 않았습니다!", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (snDt.Rows.Count == 0)
            {
                frmMessage frm2 = new frmMessage("SN이 생성되지 않았습니다!", "AUTOCLOSE");
                frm2.ShowDialog();
                return;
            }

            if (snDt.Rows[0]["p_err_code"].ToString() != "OK")
            {
                frmMessage frm2 = new frmMessage("SN이 생성되지 않았습니다!", "AUTOCLOSE");
                frm2.ShowDialog();
                return;
            }
            if (flag == "SN")
            {
                label_search("SN", grdSN);

                frmMessage frm3 = new frmMessage("SN 생성이 완료 되었습니다!", "AUTOCLOSE");
                frm3.ShowDialog();
            }
            else
            {
                label_search("GANBAN", grdGanban);

                frmMessage frm4 = new frmMessage("SN 생성이 완료 되었습니다!", "AUTOCLOSE");
                frm4.ShowDialog();
            }
        }

        private void check_process(ExGrid grid, bool check)
        {
            for(int i=0;i<grid.Rows.Count;i++)
            {
                grid.Rows[i].Cells[1].Value = check;
            }
        }

        private void btnCheckAll_Click(object sender, EventArgs e)
        {
            if(btnSNList.BackColor == Color.BurlyWood)
            {
                check_process(grdSN, true);
            }
            else
            {
                check_process(grdGanban, true);
            }
            
        }

        private void btnUnCheckAll_Click(object sender, EventArgs e)
        {
            if (btnSNList.BackColor == Color.BurlyWood)
            {
                check_process(grdSN, false);
            }
            else
            {
                check_process(grdGanban, false);
            }
        }

        private void btnSNList_Click(object sender, EventArgs e)
        {
            grdSN.Visible = true;
            grdGanban.Visible = false;

            btnSNList.BackColor = Color.BurlyWood;
            btnGanbanList.BackColor = Color.Gainsboro;
            
        }

        private void btnGanbanList_Click(object sender, EventArgs e)
        {
            grdSN.Visible = false;
            grdGanban.Visible = true;

            btnSNList.BackColor = Color.Gainsboro;
            btnGanbanList.BackColor = Color.BurlyWood;
        }

        private void delelte_process(string labeltype, ExGrid grid)
        {
            int grdrows = grid.Rows.Count;

            if (grdrows <= 0)
            {
                frmMessage frm0 = new frmMessage("" + labeltype + " List가 존재하지 않습니다.", "AUTOCLOSE");
                frm0.ShowDialog();
                return;
            }

            frmMessage frm = new frmMessage("작업오더(" + lblWO.Text + ")의 " + labeltype + " List를 삭제하겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("p_err_msg", "");
                paramsMap.Add("p_runCount", "");
                paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("P_WORK_ORDER_ID", lblWO.Text.Trim());
                paramsMap.Add("P_LABELTYPE", labeltype);
                paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);
                paramsList.Add(paramsMap);

                string retvalue = "";
                DataTable snDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_presnganbandelete_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                if (snDt == null)
                {
                    frmMessage frm1 = new frmMessage(labeltype + "이 삭제 되지 않았습니다!", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }

                if (snDt.Rows.Count == 0)
                {
                    frmMessage frm2 = new frmMessage(labeltype + "이 삭제 되지 않았습니다!", "AUTOCLOSE");
                    frm2.ShowDialog();
                    return;
                }

                if (snDt.Rows[0]["p_err_code"].ToString() != "OK")
                {
                    frmMessage frm2 = new frmMessage(labeltype + "이 삭제 되지 않았습니다!", "AUTOCLOSE");
                    frm2.ShowDialog();
                    return;
                }
                label_search(labeltype, grid);
                frmMessage frm3 = new frmMessage(labeltype + " List가 삭제 되었습니다.", "AUTOCLOSE");
                frm3.ShowDialog();
            }
        }

        private void btnDelSN_Click(object sender, EventArgs e)
        {
            delelte_process("SN", grdSN);
        }

        private void btnDelGanban_Click(object sender, EventArgs e)
        {
            delelte_process("GANBAN", grdGanban);
        }

        private void print_process()
        {
            string gttype = comboID2.SelectedValue.ToString();

            _gt_DesignDt.Dispose();
            _gt_DesignDt = new DataTable();

            _gt_DesignDt = clsLabelSet.LabelDesignDataSet(gttype);

            clsLabelSet.dt_label_print(clsStatic._MACADDRESS, "GTPRINT", ref _gt_DesignDt, ref _BasicDs, ref _snDt);
        }

        private void btnRePrint_Click(object sender, EventArgs e)
        {
            print_process();
        }

        private void txtPrintQty_KeyPress(object sender, KeyPressEventArgs e)
        {
            //숫자만 입력되도록 필터링
            if (!(char.IsDigit(e.KeyChar) || e.KeyChar == Convert.ToChar(Keys.Back)))
            {
                e.Handled = true;
            }
        }
    }
}
