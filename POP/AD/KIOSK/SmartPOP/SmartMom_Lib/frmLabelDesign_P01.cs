using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

using System.IO.Ports;
using SmartMom_Lib;
using MetroFramework.Forms;

namespace SmartMom_Lib
{
    public partial class frmLabelDesign_P01 : Form
    {
        DataSet _detailBindDs     = new DataSet();
        DataTable _landDt         = new DataTable();
        DataTable _underynDt      = new DataTable();
        DataTable _2DsizenDt      = new DataTable();
        DataTable _moduleWidthDt  = new DataTable();
        DataTable _ratioDt        = new DataTable();

        string _user_id = "chb.bae";
        string _wizard_label_id = "NODATA";
        string _macAddress = "";
        DataSet _basicInfoDs = new DataSet();

        LabelDesignTOZPL _script = new LabelDesignTOZPL();

        public frmLabelDesign_P01(string macaddress)
        {
            InitializeComponent();
            grdLabelObject.SetBorderAndGridlineStyles();

            grdLabelObject.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 10, FontStyle.Bold);
            grdLabelObject.DefaultCellStyle.Font = new Font("맑은고딕", 10);
            grdLabelObject.RowTemplate.Height = 24;

            _macAddress = macaddress;

            DataTable dt1 = getMethodList();
            _basicInfoDs.Tables.Add(dt1);
            _basicInfoDs.Tables[0].TableName = "METHOD_CUR";

            DataTable dt2 = getBCRPortList();
            _basicInfoDs.Tables.Add(dt2);
            _basicInfoDs.Tables[1].TableName = "MAC_CUR";


            
            _wizard_label_id = "NODATA";
            init_process();
        }

        public frmLabelDesign_P01(string label_id, string print_id, string wizardFlag, string macaddress)
        {

            InitializeComponent();
            grdLabelObject.SetBorderAndGridlineStyles();

            grdLabelObject.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 10, FontStyle.Bold);
            grdLabelObject.DefaultCellStyle.Font = new Font("맑은고딕", 10);
            grdLabelObject.RowTemplate.Height = 24;

            _macAddress = macaddress;
           

            DataTable dt1 = getMethodList();
            _basicInfoDs.Tables.Add(dt1);
            _basicInfoDs.Tables[0].TableName = "METHOD_CUR";

            DataTable dt2 = getBCRPortList();
            _basicInfoDs.Tables.Add(dt2);
            _basicInfoDs.Tables[1].TableName = "MAC_CUR";



            init_process();
            if (wizardFlag == "UPDATE")
            {
                lblLabelID.Text = label_id;
                cmbPrint.SelectedValue = print_id;

                label_list_search_one(label_id, print_id);
                label_object_search(label_id, print_id);
            }
            else if (wizardFlag == "WIZARD")
            {
                _wizard_label_id = label_id;
                label_object_search(label_id, print_id);


            }
        }


        private DataTable getBCRPortList()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("MACADDRESS", _macAddress);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_bcrport.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }

        private DataTable getPrintInfo()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_printInfo.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }

        private DataTable getMethodList()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_labelDesign_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }

        

        private void init_process()
        {
            for(int i = -20; i<=20; i++)
            {
                double value = (double)i / 10.0;
                cmbMoveX.Items.Add(value.ToString());
                cmbMoveY.Items.Add(value.ToString());
            }

            cmbMoveX.Text = "0";
            cmbMoveY.Text = "0";


            DataTable dt1 = getPrintInfo();
            _detailBindDs.Tables.Add(dt1);
            _detailBindDs.Tables[0].TableName = "PRINT_CUR";

            DataTable dt2 = getMethodList();
            _detailBindDs.Tables.Add(dt2);
            _detailBindDs.Tables[1].TableName = "METHOD_CUR";


            //Dictionary<string, string> paramMethodMap = new Dictionary<string, string>();
            //_detailBindDs  = clsJson.select_DataTable("PRINT_INFO_SELECT^LABEL_METHOD_SELECT", paramMethodMap, "PRINT_CUR", "METHOD_CUR");

            cmbPrint.ValueMember = "PRINTID";
            cmbPrint.DisplayMember = "PRINTDESC";
            cmbPrint.DataSource = dt1;
            cmbPrint.SelectedIndex = 0;

            

            cmbMethod.ValueMember = "methodId";
            cmbMethod.DisplayMember = "methodDesc";
            cmbMethod.DataSource = dt2;
            cmbMethod.SelectedIndex = 0;

            cmbState.Text = "Valid";

            _landDt.Columns.Add("LAND_ID");
            _landDt.Columns.Add("LAND_DESC");

            _landDt.Rows.Add("N", "N(Normal)");
            _landDt.Rows.Add("R", "R(90도)");
            _landDt.Rows.Add("I", "I(180도)");
            _landDt.Rows.Add("B", "B(270도)");

            cmbLANDSCAPE.Text = "N(Normal)";
            cmbLANDSCAPE.ValueMember = "LAND_ID";
            cmbLANDSCAPE.DisplayMember = "LAND_DESC";
            cmbLANDSCAPE.DataSource = _landDt;
            cmbLANDSCAPE.SelectedIndex = 0;

            _underynDt.Columns.Add("YN_ID");
            _underynDt.Columns.Add("YN_DESC");
            _underynDt.Rows.Add("Y", "Y");
            _underynDt.Rows.Add("N", "N");

            cmbBARCODE_TEXT_UNDER_YN.ValueMember = "YN_ID";
            cmbBARCODE_TEXT_UNDER_YN.DisplayMember = "YN_DESC";
            cmbBARCODE_TEXT_UNDER_YN.DataSource = _underynDt;
            cmbBARCODE_TEXT_UNDER_YN.SelectedIndex = 0;

            _2DsizenDt.Columns.Add("2D_ID");
            _2DsizenDt.Columns.Add("2D_DESC");

            _2DsizenDt.Rows.Add("1", "1");
            _2DsizenDt.Rows.Add("2", "2");
            _2DsizenDt.Rows.Add("3", "3");
            _2DsizenDt.Rows.Add("4", "4");
            _2DsizenDt.Rows.Add("5", "5");
            _2DsizenDt.Rows.Add("6", "6");
            _2DsizenDt.Rows.Add("7", "7");
            _2DsizenDt.Rows.Add("8", "8");
            _2DsizenDt.Rows.Add("9", "9");
            _2DsizenDt.Rows.Add("10", "10");

            cmbBARCODE_2D_SIZE.ValueMember = "2D_ID";
            cmbBARCODE_2D_SIZE.DisplayMember = "2D_DESC";
            cmbBARCODE_2D_SIZE.DataSource = _2DsizenDt;
            cmbBARCODE_2D_SIZE.SelectedIndex = 0;


            _moduleWidthDt.Columns.Add("WIDTH_ID");
            _moduleWidthDt.Columns.Add("WIDTH_DESC");

            _moduleWidthDt.Rows.Add("1", "1");
            _moduleWidthDt.Rows.Add("2", "2");
            _moduleWidthDt.Rows.Add("3", "3");
            _moduleWidthDt.Rows.Add("4", "4");
            _moduleWidthDt.Rows.Add("5", "5");
            _moduleWidthDt.Rows.Add("6", "6");
            _moduleWidthDt.Rows.Add("7", "7");
            _moduleWidthDt.Rows.Add("8", "8");
            _moduleWidthDt.Rows.Add("9", "9");
            _moduleWidthDt.Rows.Add("10", "10");

            cmbBARCODE_MODULE_WIDTH.ValueMember = "WIDTH_ID";
            cmbBARCODE_MODULE_WIDTH.DisplayMember = "WIDTH_DESC";
            cmbBARCODE_MODULE_WIDTH.DataSource = _moduleWidthDt;
            cmbBARCODE_MODULE_WIDTH.SelectedIndex = 0;

            _ratioDt.Columns.Add("RATIO_ID");
            _ratioDt.Columns.Add("RATIO_DESC");

            _ratioDt.Rows.Add("1", "1");
            _ratioDt.Rows.Add("2", "2");
            _ratioDt.Rows.Add("3", "3");

            cmbBARCODE_RATIO.ValueMember = "RATIO_ID";
            cmbBARCODE_RATIO.DisplayMember = "RATIO_DESC";
            cmbBARCODE_RATIO.DataSource = _ratioDt;
            cmbBARCODE_RATIO.SelectedIndex = 1;

            grdLabelObject.SetComboBoxCell("METHODID", _detailBindDs.Tables[1], "METHODID", "METHODDESC");
            grdLabelObject.SetComboBoxCell("LANDSCAPE", _landDt, "LAND_ID", "LAND_DESC");

            lblStatus.Text = "";
        }

        private void panel_bind_process(int rownum)
        {
            foreach (Control control in pnlMain.Controls)
            {
                if (control.Tag == null)
                {
                    continue;
                }

                if (control.GetType() == typeof(TextBox))
                {
                    if (rownum == -1)
                    {
                        control.Text = "";
                    }
                    else
                    {
                        control.Text = grdLabelObject[control.Tag.ToString().Replace("_", ""), rownum].Value.ToString();
                    }
                    continue;
                }

                if (control.GetType() == typeof(ComboBox))
                {
                    if (rownum == -1)
                    {
                        ((ComboBox)control).SelectedIndex = 0;
                    }
                    else if (grdLabelObject[control.Tag.ToString().Replace("_", ""), rownum].Value.ToString().Trim() == "")
                    {
                        ((ComboBox)control).SelectedIndex = 0;
                    }
                    else
                    {
                        ((ComboBox)control).SelectedValue = grdLabelObject[control.Tag.ToString().Replace("_", ""), rownum].Value.ToString();
                    }
                    continue;
                }
            }
        }

        private void cmbMethod_SelectedValueChanged(object sender, EventArgs e)
        {
            control_enable_process();
        }

        private void control_enable_process()
        {
            if (cmbMethod.SelectedValue == null)
                return;

            DataRow[] drs = _detailBindDs.Tables[1].Select("METHODID = '" + cmbMethod.SelectedValue.ToString() + "'");
            string[] strs = drs[0]["METHODFIELD"].ToString().Split('^');

            foreach (Control control in pnlMain.Controls)
            {
                if (control.Tag == null)
                {
                    continue;
                }

                if (cmbMethod.SelectedValue.ToString() == "NONE")
                {

                    if (control.Name == "cmbMethod")
                    {
                        control.Enabled = true;
                    }
                    else
                    {
                        control.Enabled = false;
                    }
                    continue;
                }

                if (control.GetType() == typeof(TextBox)
                    || control.GetType() == typeof(ComboBox)
                    || control.GetType() == typeof(Button)
                    )
                {
                    control.Enabled = item_enable_disable(control.Tag.ToString(), ref strs);
                }

            }
        }

        private bool item_enable_disable(string control_tag, ref string[] config_controls)
        {
            bool retbuf = false;

            for (int i = 0; i < config_controls.Length; i++)
            {
                if (control_tag.Replace("_", "") == config_controls[i].Replace("_", ""))
                {
                    retbuf = true;
                    break;
                }
            }

            return retbuf;

        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void label_object_search(string label_id, string print_id)
        {
            DataTable dt = clsStatic.getLabelObject(label_id, print_id);

            grdLabelObject.DataBind(dt, true, false);

            for (int i = 0; i < grdLabelObject.Rows.Count; i++)
            {
                grdLabelObject["row_check", i].Value = true;

                string method_id = grdLabelObject["METHODID", i].Value.ToString();
                DataRow[] drs = _detailBindDs.Tables[1].Select("METHODID = '" + method_id + "'");

                if (drs.Length == 1)
                {
                    string[] strs = drs[0]["METHODFIELD"].ToString().Split('^');
                    for (int j = 0; j < grdLabelObject.ColumnCount; j++)
                    {
                        bool colorbuf = item_enable_disable(grdLabelObject.Columns[j].Name, ref strs);
                        if (colorbuf == true)
                        {
                            grdLabelObject[j, i].Style.BackColor = Color.White;
                        }
                        else
                        {
                            grdLabelObject[j, i].Style.BackColor = Color.LightGray;
                        }
                    }
                }

            }

            pnlMain.BackColor = Color.Gainsboro;
            lblStatus.Text = "";
        }

        private void label_list_search_one(string label_id, string print_id)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("LABEL_ID", label_id);
            paramsMap.Add("PRINT_ID", print_id);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_label.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            txtLabelID.Text = dt.Rows[0]["LABELID"].ToString();
            txtLabelID.ReadOnly = true;
            cmbPrint.Enabled = false;

            txtLabelDesc.Text = dt.Rows[0]["LABELDESC"].ToString();
            cmbState.Text = dt.Rows[0]["LABELSTATUS"].ToString();
            cmbPrint.SelectedValue = dt.Rows[0]["PRINTID"].ToString();
        }


        private void label_id_dup_check()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("LABEL_ID", txtLabelID.Text);
          //  paramsMap.Add("PRINT_ID", cmbPrint.SelectedValue.ToString());

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_label.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt.Rows.Count > 0)
            {
                MessageBox.Show("이미 존재하는 라벨ID입니다.");
                return;
            }

            txtLabelID.ReadOnly = true;
            cmbPrint.Enabled = false;
        }

        private void btnDupConfirm_Click(object sender, EventArgs e)
        {
            label_id_dup_check();
        }

        private void label_list_save()
        {
            string flag = "INSERT";

            if (lblLabelID.Text != "No Label List")
            {
                flag = "UPDATE";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_LABEL_ID",        txtLabelID.Text);
            paramsMap.Add("P_LABEL_DESC",      txtLabelDesc.Text);
            paramsMap.Add("P_PRINT_ID",        cmbPrint.SelectedValue.ToString());
            paramsMap.Add("P_LABELSTATUS",     cmbState.Text);
            paramsMap.Add("P_CREATE_BY",       clsStatic._USER_ID);
            paramsMap.Add("P_WIZARD_LABEL_ID", _wizard_label_id);
            paramsMap.Add("P_FLAG",            flag);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labellist_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_runCount"].ToString().Trim() == "")
            {
                dt.Rows[0]["p_runCount"] = "0";
            }

            if (dt.Rows[0]["p_err_code"].ToString().Trim() == "OK" && int.Parse(dt.Rows[0]["p_runCount"].ToString().Trim()) > 0)
            {
                lblLabelID.Text = txtLabelID.Text;
                txtLABEL_SEQ.Text = "1";
                _wizard_label_id = "NODATA";
            }
        }

        private string null_chech(string value)
        {
            string retbuf = "0";

            if(value == null)
            {
                return retbuf;
            }
            
            if(value.Trim() == "")
            {
                return retbuf;
            }

            return value;
        }

        private void label_object_save(string flag)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_FLAG",                  flag);
            paramsMap.Add("P_LABEL_ID",              txtLabelID.Text);
            paramsMap.Add("P_PRINT_ID",              cmbPrint.SelectedValue.ToString());
            paramsMap.Add("P_LABEL_SEQ",             txtLABEL_SEQ.Text);
            paramsMap.Add("P_METHOD_ID",             cmbMethod.SelectedValue.ToString());
            paramsMap.Add("P_X_POSITION_MM",         null_chech(txtX_POSITION_MM.Text));
            paramsMap.Add("P_Y_POSITION_MM",         null_chech(txtY_POSITION_MM.Text));
            paramsMap.Add("P_X_POSITION_PIX",        null_chech(txtX_POSITION_PIX.Text));
            paramsMap.Add("P_Y_POSITION_PIX",        null_chech(txtY_POSITION_PIX.Text));
            paramsMap.Add("P_LINE_THICKNESS",        null_chech(txtLINE_THICKNESS.Text));
            paramsMap.Add("P_WIDTH_AREA_MM",         null_chech(txtWIDTH_AREA_MM.Text));
            paramsMap.Add("P_HEIGHT_AREA_MM",        null_chech(txtHEIGHT_AREA_MM.Text));
            paramsMap.Add("P_WIDTH_AREA_PIX",        null_chech(txtWIDTH_AREA_PIX.Text));
            paramsMap.Add("P_HEIGHT_AREA_PIX",       null_chech(txtHEIGHT_AREA_PIX.Text));
            paramsMap.Add("P_BARCODE_MODULE_WIDTH",  null_chech(cmbBARCODE_MODULE_WIDTH.SelectedValue.ToString()));
            paramsMap.Add("P_BARCODE_RATIO",         null_chech(cmbBARCODE_RATIO.SelectedValue.ToString()));
            paramsMap.Add("P_LANDSCAPE",             cmbLANDSCAPE.SelectedValue.ToString());
            paramsMap.Add("P_BARCODE_HEIGHT_MM",     null_chech(txtBARCODE_HEIGHT_MM.Text));
            paramsMap.Add("P_BARCODE_HEIGHT_PIX",    null_chech(txtBARCODE_HEIGHT_PIX.Text));
            paramsMap.Add("P_BARCODE_TEXT_UNDER_YN", cmbBARCODE_TEXT_UNDER_YN.SelectedValue.ToString());
            paramsMap.Add("P_BARCODE_2D_SIZE",       null_chech(cmbBARCODE_2D_SIZE.SelectedValue.ToString()));
            paramsMap.Add("P_LABEL_VALUE",           clsStatic.rest_replace_encoder(txtLABEL_VALUE.Text));
            paramsMap.Add("P_CREATE_BY",             clsStatic._USER_ID); 


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labelobject_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_runCount"].ToString().Trim() == "")
            {
                dt.Rows[0]["p_runCount"] = "0";
            }

            if (dt.Rows[0]["p_err_code"].ToString().Trim() == "OK" && int.Parse(dt.Rows[0]["p_runCount"].ToString().Trim()) > 0)
            {
                lblLabelID.Text = txtLabelID.Text;
                btnLabelListSave.Enabled = false;
                panel_bind_process(-1);
                label_object_search(lblLabelID.Text, cmbPrint.SelectedValue.ToString());
            }
            else
            {
                frmMessage frm = new frmMessage("프린터 해상도 불일치 .", "OK");
                frm.ShowDialog();
                txtLABEL_SEQ.Text = "";
            }
        }

        

        private void label_object_delete()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_LABEL_ID", txtLabelID.Text);
            paramsMap.Add("P_PRINT_ID", cmbPrint.SelectedValue.ToString());
            paramsMap.Add("P_LABEL_SEQ", txtLABEL_SEQ.Text);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labelobjectdel_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_runCount"].ToString().Trim() == "")
            {
                dt.Rows[0]["p_runCount"] = "0";
            }

            if (dt.Rows[0]["p_err_code"].ToString().Trim() == "OK" && int.Parse(dt.Rows[0]["p_runCount"].ToString().Trim()) > 0)
            {
                lblLabelID.Text = txtLabelID.Text;
                btnLabelListSave.Enabled = false;
                panel_bind_process(-1);
                label_object_search(lblLabelID.Text, cmbPrint.SelectedValue.ToString());
            }
            else
            {
                frmMessage frm = new frmMessage("삭제가 동작되지 않았습니다.", "OK");
                frm.ShowDialog();
                txtLABEL_SEQ.Text = "";
            }
        }

        private void btnLabelListSave_Click(object sender, EventArgs e)
        {
            if (cmbPrint.SelectedValue.ToString() == "NONE")
            {
                MessageBox.Show("프린터를 선택하여 주세요.");
                return;
            }

            if (txtLabelID.ReadOnly == false)
            {
                MessageBox.Show("라벨ID 중복확인을 하여 주세요.");
                return;
            }
            label_list_save();
            btnSearch_Click(null, null);
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            lblStatus.Text = "INSERT";
            pnlMain.BackColor = Color.Goldenrod;
            txtLABEL_SEQ.Text = (grdLabelObject.Rows.Count + 1).ToString();

            cmbMethod.Enabled = true;

        }

        private void btnLabelObjectSave_Click(object sender, EventArgs e)
        {
            if (lblStatus.Text == "Status" || lblStatus.Text == "")
            {
                MessageBox.Show("라벨정보 입력 후 저장하여 주세요.");
                return;
            }
            label_object_save(lblStatus.Text);
        }

        private void btnSearch_Click(object sender, EventArgs e)
        {
            label_object_search(lblLabelID.Text, cmbPrint.SelectedValue.ToString());
        }

        private void grdLabelObject_CellDoubleClick(object sender, DataGridViewCellEventArgs e)
        {
            if(txtLabelID.Text == "" && txtLabelID.ReadOnly == false)
            {
                MessageBox.Show("라벨리스트 정보를 저장하여 주세요!");
                return;
            }

            int rownum = grdLabelObject.CurrentCellAddress.Y;

            lblStatus.Text = "UPDATE";
            pnlMain.BackColor = Color.LightBlue;
            panel_bind_process(rownum);
        }

        private void btnX_POSITION_PIX_Click(object sender, EventArgs e)
        {
            mm_to_fix_main_process(txtX_POSITION_MM, txtX_POSITION_PIX, lblX_POSITION_MM);

        }

        private void mm_to_fix_main_process(TextBox source, TextBox target, Label title)
        {
            try
            {
                 string strX_positionvalue = source.Text.Trim();
                double doubleX_positionvalue = double.Parse(strX_positionvalue.ToString());

                double doublePix = mmtopix_process(doubleX_positionvalue);

                target.Text = doublePix.ToString();

                textbox_BackColor_Set(target, Color.White);
            }
            catch
            {
                MessageBox.Show("정확한 '" + title.Text + "' 값을 입력하여 주세요.");
            }
        }

        private double mmtopix_process(double mmbuf)
        {
            double retbuf = 0;

            DataRow[] drs = _detailBindDs.Tables[0].Select("PRINTID = '" + cmbPrint.SelectedValue.ToString() + "'");

            double dpi = float.Parse(drs[0]["PRINTDPIMM"].ToString());

            retbuf = mmbuf * dpi;

            retbuf = Math.Round(retbuf, 0);

            return retbuf;
        }

        private void btnY_POSITION_PIX_Click(object sender, EventArgs e)
        {
            mm_to_fix_main_process(txtY_POSITION_MM, txtY_POSITION_PIX, lblY_POSITION_MM);
        }

        private void btnWIDTH_AREA_PIX_Click(object sender, EventArgs e)
        {
            mm_to_fix_main_process(txtWIDTH_AREA_MM, txtWIDTH_AREA_PIX, lblWIDTH_AREA_MM);
        }

        private void btnHEIGHT_AREA_PIX_Click(object sender, EventArgs e)
        {
            mm_to_fix_main_process(txtHEIGHT_AREA_MM, txtHEIGHT_AREA_PIX, lblHEIGHT_AREA_MM);
        }

        private void btnBARCODE_HEIGHT_PIX_Click(object sender, EventArgs e)
        {
            mm_to_fix_main_process(txtBARCODE_HEIGHT_MM, txtBARCODE_HEIGHT_PIX, lblBARCODE_HEIGHT_MM);
        }

        private void btnPrint_Click(object sender, EventArgs e)
        {
            MessageBox.Show("출력 포트는 GT_LABEL의 설정값으로 출력됩니다.");

            LabelDesignTOZPL zpl = new LabelDesignTOZPL();

            string printPort = _basicInfoDs.Tables["MAC_CUR"].Rows[0]["GTPRINT"].ToString();
            zpl.DataGridView_TO_ZPL_Script(ref grdLabelObject, printPort);

        }

        private void btnLabelObjectDelete_Click(object sender, EventArgs e)
        {
            if (lblStatus.Text == "Status" || lblStatus.Text == "")
            {
                return;
            }
            label_object_delete();
        }

        private void textbox_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!(Char.IsDigit(e.KeyChar)) && e.KeyChar != 8 && e.KeyChar != '.') //8:백스페이스
            {
                e.Handled = true;
            }
        }

        private void textbox_BackColor_Set(TextBox textBox, Color color)
        {
            textBox.BackColor = color;
        }

        private void txtX_POSITION_MM_KeyUp(object sender, KeyEventArgs e)
        {
            textbox_BackColor_Set(txtX_POSITION_MM, Color.White);
            textbox_BackColor_Set(txtX_POSITION_PIX, Color.Tan);
        }

        private void txtY_POSITION_MM_KeyUp(object sender, KeyEventArgs e)
        {
            textbox_BackColor_Set(txtY_POSITION_MM, Color.White);
            textbox_BackColor_Set(txtY_POSITION_PIX, Color.Tan);
        }

        private void txtX_POSITION_PIX_KeyUp(object sender, KeyEventArgs e)
        {
            textbox_BackColor_Set(txtX_POSITION_MM, Color.Tan);
            textbox_BackColor_Set(txtX_POSITION_PIX, Color.White);
        }

        private void txtY_POSITION_PIX_KeyUp(object sender, KeyEventArgs e)
        {
            textbox_BackColor_Set(txtY_POSITION_MM, Color.Tan);
            textbox_BackColor_Set(txtY_POSITION_PIX, Color.White);
        }

        private void txtWIDTH_AREA_PIX_KeyUp(object sender, KeyEventArgs e)
        {
            textbox_BackColor_Set(txtWIDTH_AREA_MM, Color.Tan);
            textbox_BackColor_Set(txtWIDTH_AREA_PIX, Color.White);
        }

        private void txtHEIGHT_AREA_PIX_KeyUp(object sender, KeyEventArgs e)
        {
            textbox_BackColor_Set(txtHEIGHT_AREA_MM, Color.Tan);
            textbox_BackColor_Set(txtHEIGHT_AREA_PIX, Color.White);
        }

        private void txtBARCODE_HEIGHT_MM_KeyUp(object sender, KeyEventArgs e)
        {
            textbox_BackColor_Set(txtBARCODE_HEIGHT_PIX, Color.Tan); 
        }

        private void txtWIDTH_AREA_MM_KeyUp(object sender, KeyEventArgs e)
        {
            textbox_BackColor_Set(txtWIDTH_AREA_MM, Color.White);
            textbox_BackColor_Set(txtWIDTH_AREA_PIX, Color.Tan);
        }

        private void txtHEIGHT_AREA_MM_KeyUp(object sender, KeyEventArgs e)
        {
            textbox_BackColor_Set(txtHEIGHT_AREA_MM, Color.White);
            textbox_BackColor_Set(txtHEIGHT_AREA_PIX, Color.Tan);
        }

        private void txtBARCODE_HEIGHT_PIX_KeyUp(object sender, KeyEventArgs e)
        {
            textbox_BackColor_Set(txtBARCODE_HEIGHT_PIX, Color.White);
        }

        private void btnMove_Click(object sender, EventArgs e)
        {
            if(cmbMoveX.Text == "0" && cmbMoveY.Text == "0")
            {
                frmMessage frm = new frmMessage("먼저 이동 좌표를 입력하여 주세요.", "OK");
                frm.ShowDialog();
                return;
            }

            double xposition_mm = 0;
            double yposition_mm = 0;
            double xposition_pix = 0;
            double yposition_pix = 0;
            int label_seq = 0;
            bool checkbuf = false;
            string printid = "";
            for (int i = 0; i < grdLabelObject.Rows.Count; i++)
            {
                if(grdLabelObject["row_check", i].Value == null)
                {
                    checkbuf = false;
                }
                else
                {
                    checkbuf = (bool)grdLabelObject["row_check", i].Value;
                }
                
                if(checkbuf == true)
                {
                    printid = grdLabelObject["PRINTID", i].Value.ToString();
                    label_seq = int.Parse(grdLabelObject["LABELSEQ", i].Value.ToString());
                    xposition_mm = double.Parse(grdLabelObject["XPOSITIONMM", i].Value.ToString()) + double.Parse(cmbMoveX.Text);
                    yposition_mm = double.Parse(grdLabelObject["YPOSITIONMM", i].Value.ToString()) + double.Parse(cmbMoveY.Text);
                    
                    if(xposition_mm < 0)
                    {
                        xposition_mm = 0;
                    }

                    if (yposition_mm < 0)
                    {
                        yposition_mm = 0;
                    }

                    xposition_pix = mmtopix_process(xposition_mm);
                    yposition_pix = mmtopix_process(yposition_mm);



                    List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                    Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                    paramsMap.Add("p_err_code", "");
                    paramsMap.Add("p_err_msg", "");
                    paramsMap.Add("p_runCount", "");
                    paramsMap.Add("P_LABEL_ID", txtLabelID.Text);
                    paramsMap.Add("P_PRINT_ID", printid);
                    paramsMap.Add("P_LABEL_SEQ", label_seq.ToString());
                    paramsMap.Add("P_X_POSITION_MM", xposition_mm.ToString());
                    paramsMap.Add("P_Y_POSITION_MM", yposition_mm.ToString());
                    paramsMap.Add("P_X_POSITION_PIX", xposition_pix.ToString());
                    paramsMap.Add("P_Y_POSITION_PIX", yposition_pix.ToString());
                    paramsMap.Add("P_CREATE_BY",      clsStatic._USER_ID);


                    paramsList.Add(paramsMap);

                    string retvalue = "";

                    DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labelobjectmove_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                }
            }
            label_object_search(lblLabelID.Text, cmbPrint.SelectedValue.ToString());

        }

        private void fix_to_mm_main_process(TextBox source, TextBox target, Label title)
        {
            try
            {
                string strX_positionvalue = source.Text.Trim();
                float floatX_positionvalue = float.Parse(strX_positionvalue.ToString());

                double floatPix = fixtomm_process(floatX_positionvalue);

                target.Text = floatPix.ToString();

                textbox_BackColor_Set(target, Color.White);
            }
            catch
            {
                MessageBox.Show("정확한 '" + title.Text + "' 값을 입력하여 주세요.");
            }
        }

        private double fixtomm_process(float mmbuf)
        {
            double retbuf = 0;

            DataRow[] drs = _detailBindDs.Tables[0].Select("PRINTID = '" + cmbPrint.SelectedValue.ToString() + "'");

            double dpi = float.Parse(drs[0]["PRINTDPIMM"].ToString());

            retbuf = mmbuf / dpi;

            retbuf = Math.Round(retbuf, 3);

            return retbuf;
        }

        private void btnX_POSITION_MM_Click(object sender, EventArgs e)
        {
            fix_to_mm_main_process(txtX_POSITION_PIX, txtX_POSITION_MM, lblX_POSITION_PIX);
        }

        private void btnY_POSITION_MM_Click(object sender, EventArgs e)
        {
            fix_to_mm_main_process(txtY_POSITION_PIX, txtY_POSITION_MM, lblY_POSITION_PIX);

        }

        private void btnWIDTH_AREA_MM_Click(object sender, EventArgs e)
        {
            fix_to_mm_main_process(txtWIDTH_AREA_PIX, txtWIDTH_AREA_MM, lblWIDTH_AREA_PIX);
        }

        private void btnHEIGHT_AREA_MM_Click(object sender, EventArgs e)
        {
            fix_to_mm_main_process(txtHEIGHT_AREA_PIX, txtHEIGHT_AREA_MM, lblHEIGHT_AREA_PIX);
        }

        private void btnBARCODE_HEIGHT_MM_Click(object sender, EventArgs e)
        {
            fix_to_mm_main_process(txtBARCODE_HEIGHT_PIX, txtBARCODE_HEIGHT_MM, lblBARCODE_HEIGHT_PIX);
        }

        private void cmbPrint_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}