﻿using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
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
        string _iteminputtype = "";
        string _glabeltype = "";
        string _planQty = "";
        string _ganbanid = "";

        DataTable _id1Dt = new DataTable();
        DataTable _id2Dt = new DataTable();
        DataTable _ganban1Dt = new DataTable();
        DataTable _ganban2Dt = new DataTable();
        DataTable _ZPLDt = new DataTable();
        DataTable _moldDt = new DataTable();
        DataTable _gt_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();
        DataTable _snDt = new DataTable();
        DataTable _ganbanDt = new DataTable();
        DataTable _chkLCM = new DataTable();
        DataTable _chkA4 = new DataTable();

        public frmLabelPrintDetail(string resourceId, string resorceName, string pn,    string pntext,   string spec,  string plandate,  string wo,         string planqty,  string ganbanId
                                 , string labelId,    string wocode,     string idrule, string itemtype, string ctqyt, string inputtype, string glabeltype, string lgitemid )
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
            txtExtraPlanQty.Text   = (int.Parse(planqty.Trim().Replace(",", "")) + 20).ToString();
            _wocode            = wocode;
            lblIDRule.Text     = idrule;
            lblItemtype.Text   = itemtype;
            lblPackSize.Text   = ctqyt;
            txtPrintQty.Text   = "0";
            _iteminputtype     = inputtype;
            _glabeltype        = glabeltype;
            lblLGE.Text        = lgitemid;
            _ganbanid = ganbanId;

            InitSNLabelList();
            InitGanbanLabelList();

            grdSN.Dock = DockStyle.Fill;
            grdGanban.Dock = DockStyle.Fill;

            #region 화면 컨트롤 Validation
            //ID 라벨 발행 여부 체크
            if (_iteminputtype == "BUTTON") //선공정(최종공정X)
            {
                //chkID1.Enabled = false;
                radioId1.Enabled = false;
                //chkID2.Enabled = false;
                radioId2.Enabled = false;
                comboID1.Enabled = false;
                comboID2.Enabled = false;
                btnMakeSN.Enabled = false;
                btnDelSN.Enabled = false;
            }
            else
            {
                txtPrintQty.Enabled = false;
            }

            //Ganban 라벨 발행 여부 체크
            if(_glabeltype == "ROLL")
            {
                if (_iteminputtype == "SN" & lblIDRule.Text == "BACKCOVER")
                {
                    //chkGanban1.Enabled = true;
                    radioGb1.Enabled = true;
                    //chkGanban2.Enabled = true;
                    radioGb2.Enabled = true;
                    comboGanban1.Enabled = true;
                    comboGanban2.Enabled = true;
                    btnMakeGanban.Enabled = true;
                    btnDelGanban.Enabled = true;
                } else
                {
                    //chkGanban1.Enabled = false;
                    radioGb1.Enabled = false;
                    //chkGanban2.Enabled = false;
                    radioGb2.Enabled = false;
                    comboGanban1.Enabled = false;
                    comboGanban2.Enabled = false;
                    btnMakeGanban.Enabled = false;
                    btnDelGanban.Enabled = false;
                }
            }

            //작업지시서가 대기상태가 아닐 경우
            if (_wocode != "A")
            {
                btnMakeSN.Enabled     = false; //ID라벨 생성 버튼
                btnMakeGanban.Enabled = false; //간판라벨 생성 버튼
                btnDelSN.Enabled      = false; //ID라벨 삭제 버튼
                btnDelGanban.Enabled  = false; //간판라벨 삭제 버튼
            }
            else if(grdSN.Rows.Count > 1)
            {
                //삭제버튼 사용가능 여부 체크
                del_check_process();
            }

            #endregion

            //라벨디자인 선택 콤보박스 데이터 조회
            label_list_search();

            //금형 선택 콤보박스 데이터 조회
            mold_list_search();

            //ZPL PRINT IP 선택 콤보박스 데이터 조회
            //ZPL_list_search();

            //품목 기준정보 GT_LABELID SET
            if (labelId.Trim() == "NONE" || labelId.Trim() == "")
            {
                comboID1.SelectedValue = "NONE";
                comboID1.Enabled = false;
            }
            else
            {
                comboID1.SelectedValue = labelId.Trim();
                comboID1.Enabled = false;
            }

            //품목 기준정보 GANBAN_LABELID SET
            if (ganbanId.Trim() == "NONE" || ganbanId.Trim() == "")
            {
                comboGanban1.SelectedValue = "NONE";
                //comboGanban1.Enabled = false;
            }
            else
            {
                comboGanban1.SelectedValue = ganbanId.Trim();
                comboGanban1.Enabled = false;
            }

            label_search("SN", grdSN);
            label_search("GANBAN", grdGanban);

            
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

        private void mold_list_search()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();

            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("WORK_ORDER_ID", lblWO.Text.Trim());
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            string retvalue = "";

            _moldDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_mold_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            comboMold.DisplayMember = "MOLDID";
            comboMold.ValueMember = "MOLDID";
            comboMold.DataSource = _moldDt;
        }

        //private void ZPL_list_search()
        //{
        //    List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
        //    Dictionary<string, object> paramsMap = new Dictionary<string, object>();
        //    paramsMap.Add("p_err_code", "");
        //    paramsMap.Add("MACADRESS", clsStatic._MACADDRESS);

        //    paramsList.Add(paramsMap);

        //    string retvalue = "";

        //    _ZPLDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_zpl_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

        //    comboZPL.DisplayMember = "NAME";
        //    comboZPL.ValueMember = "IP";
        //    comboZPL.DataSource = _ZPLDt;
        //}

        #region INIT
        //실적으로 등록됬을 경우 삭제 버튼 Disable 처리
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
            string[] headerText = new string[] { "Type",      "SEQ", "QTY", "ID",  "ID2",   "PROD.ID",  "CREATE DATE", "CREATE USER"   }; //7
            string[] columnName = new string[] { "LABELTYPE", "SEQ", "QTY", "SN",  "SN2",   "PRODSN",   "CREATEDATE",  "CREATEBY"      };
                                                                                                            
            string[] columnType = new string[] { "T",         "T",   "T",   "T",   "T",     "T",        "T",          "T"              };
            int[] columnWidth    = new int[]   { 70,          70,    70,    220,   220,     220,        145,          110              };
            bool[] columnVisible = new bool[]  { true,        true,  true,  true,  true,    true,       true,         true             };
            bool[] columnDisable = new bool[]  { true,        true,  true,  true,  true,    true,       true,         true             };
            string[] cellAlign = new string[]  { "C",         "C",   "C",   "C",   "C",     "C",        "C",          "C"              };

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
            //                                   0            1      2      3             4             5                  6              7                                    
            string[] headerText = new string[] { "Type",      "SEQ", "QTY", "GANBAN ID",  "GANBAN ID2", "PROD.GANBAN ID",  "CREATE DATE", "CREATE USER"   }; //7
            string[] columnName = new string[] { "LABELTYPE", "SEQ", "QTY", "GANBANID",   "GANBANID2",  "PRODSN",          "CREATEDATE",  "CREATEBY"      };
                                                                                                           
            string[] columnType = new string[] { "T",         "T",   "T",   "T",          "T",          "T",               "T",           "T"              };
            int[] columnWidth    = new int[]   { 70,          70,    70,    160,          160,          160,               145,           110              };
            bool[] columnVisible = new bool[]  { true,        true,  true,  true,         true,         true,              true,          true             };
            bool[] columnDisable = new bool[]  { true,        true,  true,  true,         true,         true,              true,          true             };
            string[] cellAlign = new string[]  { "C",         "C",   "C",   "C",          "C",          "C",               "C",           "C"              };

            grdGanban.SetBorderAndGridlineStyles();
            grdGanban.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGanban.DefaultCellStyle.Font = new Font("맑은고딕", 10F);
            grdGanban.RowTemplate.Height = 36;
            //grdGanban.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            grdGanban.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 10F);
            grdGanban.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        #endregion

        //생성된 라벨 리스트 조회
        private void label_search(string flag, ExGrid grid)
        {
            string labeltype = "SN";
            if (flag == "GANBAN")
            {
                labeltype = "GANBAN";
                comboMold.SelectedValue = "";
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

            if(_snDt.Rows.Count > 0 && _snDt.Rows[0]["SN2LBLID"].ToString() != "")
            {
                //ID2 가 생성되어있을 경우 생성 당시 ID Label Rule 값 Setting
                comboID2.SelectedValue = _snDt.Rows[0]["SN2LBLID"].ToString();
                comboID2.Enabled = false;
            }
            else
            {
                if (_iteminputtype == "SN")
                {
                    comboID2.Enabled = true;
                }
            }

            if (_ganbanDt.Rows.Count > 0)
            {
                txtProject.Text = _ganbanDt.Rows[0]["PROJECT"].ToString();
                txtShift.Text = _ganbanDt.Rows[0]["SHIFT"].ToString();
                txtType.Text = _ganbanDt.Rows[0]["TYPE"].ToString();
                comboMold.SelectedValue = _ganbanDt.Rows[0]["IDMOLDNO"].ToString();

                if (_ganbanDt.Rows[0]["GANBANID2LBLID"].ToString() != "")
                {
                    //GANBAN2 가 생성되어있을 경우 생성 당시 GANBAN Label Rule 값 Setting
                    comboGanban2.SelectedValue = _ganbanDt.Rows[0]["GANBANID2LBLID"].ToString();
                    comboGanban2.Enabled = false;
                }
                
            }
            else
            {
                if (_glabeltype == "A4")
                {
                    comboGanban2.Enabled = true;
                }
            }

            if (comboMold.SelectedValue != null)
            {
                comboMold.Enabled = false;
            }
            else
            {
                comboMold.Enabled = true;
            }


        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        
        #region 라벨 생성

        //ID 생성
        private void btnMakeSN_Click(object sender, EventArgs e)
        {
            btnSNList_Click(sender, e);


            //if (lblIDRule.Text == "BACKCOVER" || lblIDRule.Text == "STANDBASE")
            //{
            //    if(comboMold.Text.Trim() == "")
            //    {
            //        //Mold No.(금형번호)를 입력하여 주세요.
            //        frmMessage frm0 = new frmMessage("Please enter the Mold No.", "AUTOCLOSE");
            //        frm0.ShowDialog();
            //        return;
            //    }
            //}

            if(grdSN.RowCount == 0 && radioId1.Checked == false)
            {
                //먼저 ID1 Label을 생성하여 주세요.
                frmMessage frm0 = new frmMessage("Please create ID1 Label first.", "AUTOCLOSE");
                frm0.ShowDialog();
                return;
            }


            ////생성된 SN이 있는데, ID1/GANBAN ID1 을 생성하려는 경우
            //if (grdSN.RowCount > 0 && radioId1.Checked)
            //{
            //    //이미 생성된 SN이 존재합니다.
            //    frmMessage frm0 = new frmMessage("Already created SN exists.", "AUTOCLOSE");
            //    frm0.ShowDialog();
            //    return;
            //}

            _planQty = txtExtraPlanQty.Text.Trim().Replace(",", "");
            makesn("SN", grdSN);

        }

        //간판라벨 생성
        private void btnMakeGanban_Click(object sender, EventArgs e)
        {
            btnGanbanList_Click(sender, e);

            if (lblIDRule.Text == "BACKCOVER" || lblIDRule.Text == "STANDBASE")
            {
                if (_iteminputtype == "BUTTON")
                {
                    if (comboMold.Text.Trim() == "")
                    {
                        //Mold No.(금형번호)를 입력하여 주세요.
                        frmMessage frm0 = new frmMessage("Please enter the Mold No.", "AUTOCLOSE");
                        frm0.ShowDialog();
                        return;
                    }
                }
            }

            if (grdGanban.RowCount == 0 && !radioGb1.Checked)
            {
                //GANBAN1 Label을 생성하여 주세요.
                frmMessage frm = new frmMessage("Please create GANBAN1 Labels.", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            //생성된 SN이 있는데, ID1/GANBAN ID1 을 생성하려는 경우
            if (grdGanban.RowCount > 0 && radioGb1.Checked)
            {
                //이미 생성된 간판라벨이 존재합니다.
                frmMessage frm0 = new frmMessage("Already created GANBAN exists.", "AUTOCLOSE");
                frm0.ShowDialog();
                return;
            }

            if(lblPackSize.Text == "0" && txtPrintQty.Text == "0")
            {
                //Pack Size 가 없는 경우 Print Qty를 입력하여야 합니다.
                frmMessage frm = new frmMessage("If there is no pack size, you need to enter Print Qty.", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            if(lblPackSize.Text == "0" && int.Parse(txtPrintQty.Text.Replace(",", "")) < 0)
            {
                //Print Qty는 0보다 커야 합니다.
                frmMessage frm = new frmMessage("Print Qty must be greater than zero.", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            if (comboGanban1.SelectedValue.ToString() == "DG-A01")
            {
                if (txtType.Text == "")
                {
                    frmMessage frm1 = new frmMessage("TYPE Value is missing", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }

                if (txtShift.Text == "")
                {
                    frmMessage frm1 = new frmMessage("SHIFT Value is missing", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }

            } else if (comboGanban1.SelectedValue.ToString() == "DG-A02")
            {
                if (txtProject.Text == "")
                {
                    frmMessage frm1 = new frmMessage("PROJECT Value is missing", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }

                if (txtShift.Text == "")
                {
                    frmMessage frm1 = new frmMessage("SHIFT Value is missing", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }
            } else if (comboGanban1.SelectedValue.ToString() == "DG-B02")
            {
                frmMessage frm1 = new frmMessage("Please enter the Mold No.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            _planQty = txtExtraPlanQty.Text.Trim().Replace(",", "");
            makesn("GANBAN", grdGanban);
        }

        //간판라벨 추가 생성
        private void button1_Click(object sender, EventArgs e)
        {
            if (grdGanban.RowCount == 0 && !radioGb1.Checked)
            {
                //GANBAN1 Label을 생성하여 주세요.
                frmMessage frm = new frmMessage("Please create GANBAN1 Labels", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            _planQty = lblPackSize.Text.Trim();
            makesn("GANBAN", grdGanban);
        }

        private void makesn(string flag, ExGrid grid)
        {
            int grdrows = grid.Rows.Count;
            bool createYN1   = false;
            bool createYN2   = false;
            string labeltype = string.Empty;
            string rule1     = string.Empty;
            string rule2     = string.Empty;
            if (lblPackSize.Text == "")
            {
                frmMessage frm0 = new frmMessage("Pack size was not specified.", "AUTOCLOSE");
                frm0.ShowDialog();
                return;
            }

            int packQty      =  int.Parse(lblPackSize.Text.Replace(",", ""));

            //ID라벨 생성일 경우
            if (flag == "SN")
            {
                createYN1 = radioId1.Checked;
                createYN2 = radioId2.Checked;

                labeltype = "SN";
                rule1 = comboID1.SelectedValue.ToString();
                if (radioId2.Checked)
                {
                    rule2 = comboID2.SelectedValue.ToString();
                }
            }
            //GANBAN라벨 생성일 경우
            else
            {
                createYN1 = radioGb1.Checked;
                createYN2 = radioGb2.Checked;

                labeltype = "GANBAN";
                rule1 = comboGanban1.SelectedValue.ToString();

                if (radioGb2.Checked)
                {
                    rule2 = comboGanban2.SelectedValue.ToString();
                }

                //Print Qty가 입력되었을 경우 (PACK 수량 미지정)
                if(int.Parse(txtPrintQty.Text.Replace(",", "")) > 0 )
                {
                    packQty = 1;
                }

            }

            if(!createYN1 && !createYN2)
            {
                //생성할 Label 유형이 선택되지 않았습니다. .
                frmMessage frm0 = new frmMessage("The label type to create is not selected.", "AUTOCLOSE");
                frm0.ShowDialog();
                return;
            }

            string lgitemid = "";

            if(lblLGE.Text != "")
            {
                if (lblLGE.Text.Length >= 11)
                {
                    lgitemid = lblLGE.Text.Substring(lblLGE.Text.Length - 8);
                } else
                {
                    //LGEItemId를 확인 해 주세요.
                    frmMessage frm0 = new frmMessage("Please check the LGE ITEM ID.", "AUTOCLOSE");
                    frm0.ShowDialog();
                    return;
                }
                
            }

            DataTable snDt = null;

            if (lblIDRule.Text == "BACKCOVER" || lblIDRule.Text == "STANDBASE")
            {
                if (lblPN.Text.Trim() == "")
                {
                    frmMessage frm1 = new frmMessage("PART NUMBER Value is missing", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }
                if (lblItemtype.Text.Trim() == "")
                {
                    frmMessage frm1 = new frmMessage("ITEM GROUP SMALL Value is missing.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }
            } else if (lblIDRule.Text == "LCM")
            {
                if (lgitemid == "")
                {
                    frmMessage frm1 = new frmMessage("LG ITEM ID Value is missing.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }
                string validation = chkLCMValidation(lblPN.Text.Trim());
                if (validation == "INCH")
                {
                    frmMessage frm1 = new frmMessage("ITEM INCH Value is missing.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                } else if (validation == "HSCD")
                {
                    frmMessage frm1 = new frmMessage("VENDOR CORPORATE CODE Value is missing.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                } else if (validation == "NG")
                {
                    frmMessage frm1 = new frmMessage("Please check the ITEM information.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }
            }

            //ID1 생성 시 호출 (ID2 가 체크되어있을 경우 동시에 생성. rule2 값으로 생성여부 구분)
            if (createYN1)
            {
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("p_err_msg", "");
                paramsMap.Add("p_runCount", "");
                paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("P_ITEM_ID", lblPN.Text.Trim());
                paramsMap.Add("P_IDLABELRULE1", rule1);
                paramsMap.Add("P_IDLABELRULE2", rule2);
                paramsMap.Add("P_Y", datePlandate.Value.ToString("yyyy").Substring(2, 2));
                paramsMap.Add("P_MM", datePlandate.Value.ToString("MM"));
                paramsMap.Add("P_DD", datePlandate.Value.ToString("dd"));
                paramsMap.Add("P_WORK_ORDER_ID", lblWO.Text.Trim());
                paramsMap.Add("P_PLANQTY", _planQty);
                paramsMap.Add("P_MOLDNO", comboMold.Text);
                paramsMap.Add("P_LABELTYPE", labeltype);
                paramsMap.Add("P_ITEMTYPE", lblItemtype.Text.Trim());
                paramsMap.Add("P_PACKQTY", packQty);
                paramsMap.Add("P_PRINTQTY", txtPrintQty.Text.Trim());
                paramsMap.Add("P_PROJECT", txtProject.Text.Trim());
                paramsMap.Add("P_SHIFT", txtShift.Text.Trim());
                paramsMap.Add("P_TYPE", txtType.Text.Trim());
                paramsMap.Add("P_LGE_ITEM", lgitemid);               
                paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);
                paramsList.Add(paramsMap);

                string retvalue = "";
                snDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_presnganbanmake_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
            }
            //ID1이 생성된 후 ID2 추가 생성 시 UPDATE 프로시저 호출
            else if(createYN2)
            {
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("p_err_msg", "");
                paramsMap.Add("p_runCount", "");
                paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("P_ITEM_ID", lblPN.Text.Trim());
                paramsMap.Add("P_IDLABELRULE2", rule2);
                paramsMap.Add("P_Y", datePlandate.Value.ToString("yyyy").Substring(2, 2));
                paramsMap.Add("P_MM", datePlandate.Value.ToString("MM"));
                paramsMap.Add("P_DD", datePlandate.Value.ToString("dd"));
                paramsMap.Add("P_WORK_ORDER_ID", lblWO.Text.Trim());
                paramsMap.Add("P_PLANQTY", txtExtraPlanQty.Text.Trim().Replace(",", ""));
                paramsMap.Add("P_MOLDNO", comboMold.Text);
                paramsMap.Add("P_LABELTYPE", labeltype);
                paramsMap.Add("P_ITEMTYPE", lblItemtype.Text.Trim());
                paramsMap.Add("P_PACKQTY", packQty);
                paramsMap.Add("P_PRINTQTY", txtPrintQty.Text.Trim());
                paramsMap.Add("P_PROJECT", txtProject.Text.Trim());
                paramsMap.Add("P_SHIFT", txtShift.Text.Trim());
                paramsMap.Add("P_TYPE", txtType.Text.Trim());
                paramsMap.Add("P_LGE_ITEM", lgitemid);
                paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);
                paramsList.Add(paramsMap);

                string retvalue = "";
                snDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.update_presnganbanmake_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
            }

            if (snDt == null)
            {
                //{flag}이 생성되지 않았습니다!
                frmMessage frm1 = new frmMessage($"{flag} was not created!", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (snDt.Rows.Count == 0)
            {
                //{flag}이 생성되지 않았습니다!
                frmMessage frm2 = new frmMessage($"{flag} was not created!", "AUTOCLOSE");
                frm2.ShowDialog();
                return;
            }

            if (snDt.Rows[0]["p_err_code"].ToString() != "OK")
            {
                //{flag}이 생성되지 않았습니다!
                frmMessage frm2 = new frmMessage($"{flag} was not created! {snDt.Rows[0]["p_err_msg"].ToString()} ", "AUTOCLOSE");
                frm2.ShowDialog();
                return;
            }

            if (flag == "SN")
            {
                label_search("SN", grdSN);
            }
            else
            {
                label_search("GANBAN", grdGanban);
            }
            //{flag} 생성이 완료 되었습니다!
            frmMessage frm3 = new frmMessage($"{flag}creation is complete!", "AUTOCLOSE");
            frm3.ShowDialog();
        }

        #endregion

        #region 그리드 체크

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

        private void check_process(ExGrid grid, bool check)
        {
            for (int i = 0; i < grid.Rows.Count; i++)
            {
                grid.Rows[i].Cells[1].Value = check;
            }
        }

        #endregion

        #region 그리드 전환 버튼

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
        #endregion

        #region 삭제

        private void btnDelSN_Click(object sender, EventArgs e)
        {
            if(_snDt.Rows[0]["PRODSN"].ToString().Length > 0)
            {
                //이미 실적이 등록된 라벨은 삭제할 수 없습니다.
                frmMessage frm = new frmMessage("You can't delete a label that has already been registered.", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            delelte_process("SN", grdSN);
        }

        private void btnDelGanban_Click(object sender, EventArgs e)
        {
            if (_ganbanDt.Rows[0]["PRODSN"].ToString().Length > 0)
            {
                //이미 실적이 등록된 라벨은 삭제할 수 없습니다.
                frmMessage frm = new frmMessage("You can't delete a label that has already been registered.", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            delelte_process("GANBAN", grdGanban);

        }

        private void delelte_process(string labeltype, ExGrid grid)
        {
            int grdrows = grid.Rows.Count;

            if (grdrows <= 0)
            {
                //List가 존재하지 않습니다.
                frmMessage frm0 = new frmMessage("" + labeltype + " list does not exist.", "AUTOCLOSE");
                frm0.ShowDialog();
                return;
            }
            //작업오더(" + lblWO.Text + ")의 " + labeltype + " List를 삭제하겠습니까?
            frmMessage frm = new frmMessage($"Are you sure you want to delete the {labeltype} list of the work order({lblWO.Text}) ? ", "OK_CANCEL");
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
                    //이 삭제 되지 않았습니다!
                    frmMessage frm1 = new frmMessage(labeltype + " has not been deleted!", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }

                if (snDt.Rows.Count == 0)
                {
                    //이 삭제 되지 않았습니다!
                    frmMessage frm2 = new frmMessage(labeltype + " has not been deleted!", "AUTOCLOSE");
                    frm2.ShowDialog();
                    return;
                }

                if (snDt.Rows[0]["p_err_code"].ToString() != "OK")
                {
                    //이 삭제 되지 않았습니다!
                    frmMessage frm2 = new frmMessage(labeltype + " has not been deleted!", "AUTOCLOSE");
                    frm2.ShowDialog();
                    return;
                }
                label_search(labeltype, grid);
                //List가 삭제 되었습니다.
                frmMessage frm3 = new frmMessage(labeltype + " list has been deleted.", "AUTOCLOSE");
                frm3.ShowDialog();
            }
        }
        #endregion

        #region Print
        private void btnPrint_Click(object sender, EventArgs e)
        {

        }

        private void get_ganbanlabel_Jsondata(string lebelId, string target)
        {

            DataTable result = new DataTable();

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("WORK_ORDER_ID", lblWO.Text.Trim());
            paramsMap.Add("LABEL_ID", lebelId);
            paramsMap.Add("REPRINT_YN", target);
            paramsMap.Add("DIR", @"C:\SMARTMOM\MOM.RPT\REPORT\");
            paramsList.Add(paramsMap);

            string retvalue = "";
            if (lebelId == "DG-B02")
            {
                result = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganbanLabel_data2.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            } else
            {
                result = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganbanLabel_data.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }
            
            if (result == null)
            {
                return;
            }

            if (result.Rows.Count == 0)
            {
                return;
            }

            TResponse resp = clsReport.ConvertResponse(result);
            string json = clsReport.ConvertJSON(resp);

            clsReport.createJsonFile(json, lebelId);

        }

        private void print_process()
        {
            string gttype = comboID2.SelectedValue.ToString();

            _gt_DesignDt.Dispose();
            _gt_DesignDt = new DataTable();

            _gt_DesignDt = clsLabelSet.LabelDesignDataSet(gttype);

            clsLabelSet.dt_label_print(clsStatic._MACADDRESS, "GTPRINT", ref _gt_DesignDt, ref _BasicDs, ref _snDt);
        }
        
        //라벨 재발행
        private void btnRePrint_Click(object sender, EventArgs e)
        {
            bool printExecute = false;

            #region 제품라벨 Print

            int fromPrint = int.Parse(txtFromPrint.Text) - 1;
            int toPrint = int.Parse(txtToPrint.Text);

            //제품라벨 ID1 프린트
            if (radioId1.Checked == true)
            {
                //if (comboZPL.SelectedValue.ToString() == "")
                //{
                //    frmMessage frm = new frmMessage("ZPL IP is not set.", "AUTOCLOSE");
                //    frm.ShowDialog();
                //    return;
                //}

                printExecute = true;

                if (grdSN.RowCount <= 0)
                {
                    //프린트 할 ID라벨이 생성되지 않았습니다.
                    frmMessage frm = new frmMessage("No ID label has been created for printing.", "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }

                if (fromPrint >= 0 && toPrint > 0)
                {
                    if (toPrint > fromPrint)
                    {
                        for (int i = fromPrint; i < toPrint; i++)
                        {
                            if (_snDt.Rows.Count > i)
                            {
                                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", _snDt.Rows[i]["SN"].ToString(), "", "", 0, 0, "", ref _BasicDs);
                            }
                        }
                    } else
                    {
                        //프린트 할 ID라벨이 생성되지 않았습니다.
                        frmMessage frm = new frmMessage("Please check From Number and To Number.", "AUTOCLOSE");
                        frm.ShowDialog();
                        return;
                    }
                } else
                {
                    for (int i = 0; i < grdSN.Rows.Count; i++)
                    {
                        if (grdSN.Rows[i].Cells[1].Value != null)
                        {
                            if (grdSN.Rows[i].Cells[1].Value.ToString().ToUpper() == "TRUE")
                            {
                                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", _snDt.Rows[i]["SN"].ToString(), "", "", 0, 0, "", ref _BasicDs);
                            }
                        }
                    }
                }
            }

            //제품라벨 ID2 프린트
            if (radioId2.Checked == true)
            {
                //if (comboZPL.SelectedValue.ToString() == "")
                //{
                //    frmMessage frm = new frmMessage("ZPL IP is not set.", "AUTOCLOSE");
                //    frm.ShowDialog();
                //    return;
                //}

                printExecute = true;

                if (grdSN.RowCount <= 0)
                {
                    //프린트 할 ID라벨이 생성되지 않았습니다.
                    frmMessage frm = new frmMessage("No ID label has been created for printing.", "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }

                if (_snDt.Rows[0]["SN2"].ToString() == "")
                {
                    //ID2라벨이 생성되지 않았습니다.
                    frmMessage frm = new frmMessage("ID2 label not generated.", "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }

                if (fromPrint >= 0 && toPrint > 0)
                {
                    if (toPrint > fromPrint)
                    {
                        for (int i = fromPrint; i < toPrint; i++)
                        {
                            if (_snDt.Rows.Count > i)
                            {
                                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", _snDt.Rows[i]["SN2"].ToString(), "", "", 0, 0, "", ref _BasicDs);
                            }
                        }
                    }
                    else
                    {
                        //프린트 할 ID라벨이 생성되지 않았습니다.
                        frmMessage frm = new frmMessage("Please check From Number and To Number.", "AUTOCLOSE");
                        frm.ShowDialog();
                        return;
                    }
                }
                else
                {
                    for (int i = 0; i < grdSN.Rows.Count; i++)
                    {
                        if (grdSN.Rows[i].Cells[1].Value != null)
                        {
                            if (grdSN.Rows[i].Cells[1].Value.ToString().ToUpper() == "TRUE")
                            {
                                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", _snDt.Rows[i]["SN2"].ToString(), "", "", 0, 0, "", ref _BasicDs);
                            }
                        }
                    }
                }
            }

            #endregion

            #region 간판라벨 Print

            if (radioGb1.Checked == true)
            {
                if (_glabeltype == "ROLL")
                {
                    //if (comboZPL.SelectedValue.ToString() == "")
                    //{
                    //    frmMessage frm = new frmMessage("ZPL IP is not set.", "AUTOCLOSE");
                    //    frm.ShowDialog();
                    //    return;
                    //}

                    printExecute = true;

                    if (grdGanban.RowCount <= 0)
                    {
                        //프린트 할 ID라벨이 생성되지 않았습니다.
                        frmMessage frm = new frmMessage("No ID label has been created for printing.", "AUTOCLOSE");
                        frm.ShowDialog();
                        return;
                    }

                    if (fromPrint >= 0 && toPrint > 0)
                    {
                        if (toPrint > fromPrint)
                        {
                            for (int i = fromPrint; i < toPrint; i++)
                            {
                                if (_ganbanDt.Rows.Count > i)
                                {
                                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", _ganbanDt.Rows[i]["GANBANID"].ToString(), "", 0, 0, "", ref _BasicDs);
                                }
                            }
                        }
                        else
                        {
                            //프린트 할 ID라벨이 생성되지 않았습니다.
                            frmMessage frm = new frmMessage("Please check From Number and To Number.", "AUTOCLOSE");
                            frm.ShowDialog();
                            return;
                        }
                    }
                    else
                    {
                        for (int i = 0; i < grdGanban.Rows.Count; i++)
                        {
                            if (grdGanban.Rows[i].Cells[1].Value != null)
                            {
                                if (grdGanban.Rows[i].Cells[1].Value.ToString().ToUpper() == "TRUE")
                                {
                                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", _ganbanDt.Rows[i]["GANBANID"].ToString(), "", 0, 0, "", ref _BasicDs);
                                }
                            }
                        }
                    }

                    //for (int i = 0; i < _ganbanDt.Rows.Count; i++)
                    //{
                    //    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", _ganbanDt.Rows[i]["GANBANID"].ToString(), "", 0, 0, "", ref _BasicDs);
                    //}
                }
                else
                {
                    string validation = chkA4Validation(lblPN.Text.Trim());

                    if (validation == "NG")
                    {
                        frmMessage frm1 = new frmMessage("Please check the ITEM information.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        return;
                    } else if (validation == "LABELDESC")
                    {
                        frmMessage frm1 = new frmMessage("ITEM LABET DESC Value is missing", "AUTOCLOSE");
                        frm1.ShowDialog();
                        return;
                    } else if (validation == "MATERIAL")
                    {
                        frmMessage frm1 = new frmMessage("ITEM MATERIAL TYPE Value is missing", "AUTOCLOSE");
                        frm1.ShowDialog();
                        return;
                    } else if (validation == "COLOR")
                    {
                        frmMessage frm1 = new frmMessage("ITEM COLOR Value is missing", "AUTOCLOSE");
                        frm1.ShowDialog();
                        return;
                    } else if (validation == "HSEITEMID")
                    {
                        frmMessage frm1 = new frmMessage("HSE ITEM ID Value is missing", "AUTOCLOSE");
                        frm1.ShowDialog();
                        return;
                    }

                    clsReport.delete_files();

                    printExecute = true;
                    string labelId = comboGanban1.SelectedValue.ToString();

                    //라벨 디자인 파일 다운로드
                    DataTable designdt = clsReport.excel_download(labelId);

                    if (designdt == null)
                    {
                        //{labelId}에 대한 라벨 디자인이 존재하지 않습니다.
                        frmMessage frm = new frmMessage($"The label design for {labelId} does not exist.", "AUTOCLOSE");
                        frm.ShowDialog();
                        return;
                    }

                    //품목 이미지 파일 다운로드
                    clsReport.image_download(lblPN.Text);

                    string ids = "";

                    if (fromPrint >= 0 && toPrint > 0)
                    {
                        if (toPrint > fromPrint)
                        {
                            for (int i = fromPrint; i < toPrint; i++)
                            {
                                if (_ganbanDt.Rows.Count > i)
                                {
                                    updateReprintFlag(_ganbanDt.Rows[i]["GANBANID"].ToString(), "Y");
                                }
                            }
                        }
                        else
                        {
                            //프린트 할 ID라벨이 생성되지 않았습니다.
                            frmMessage frm = new frmMessage("Please check From Number and To Number.", "AUTOCLOSE");
                            frm.ShowDialog();
                            return;
                        }
                    }
                    else
                    {
                        for (int i = 0; i < grdGanban.Rows.Count; i++)
                        {
                            if (grdGanban.Rows[i].Cells[1].Value != null)
                            {
                                if (grdGanban.Rows[i].Cells[1].Value.ToString().ToUpper() == "TRUE")
                                {
                                    updateReprintFlag(_ganbanDt.Rows[i]["GANBANID"].ToString(), "Y");
                                }
                            }
                        }
                    }
                    //json 데이터 생성
                    get_ganbanlabel_Jsondata(labelId, "Y");

                    string _Filestr = @"C:\SMARTMOM\MOM.RPT\MOM.RPT.EXE";
                    System.IO.FileInfo fi = new System.IO.FileInfo(_Filestr);
                    if (!fi.Exists)
                    {
                        // REPORT 프로그램이 설치가 안되었습니다.
                        //{labelId}에 대한 라벨 디자인이 존재하지 않습니다.
                        frmMessage frm = new frmMessage("Report program is not installed.", "AUTOCLOSE");
                        frm.ShowDialog();
                        updateReprintFlag("", "N");
                        return;
                    }

                    //프린트실행
                    executePrint();

                    //재발행 여부 원복
                    updateReprintFlag("", "N");
                }
            }

            if (radioGb2.Checked == true)
            {
                if (_glabeltype == "ROLL")
                {
                    //if (comboZPL.SelectedValue.ToString() == "")
                    //{
                    //    frmMessage frm = new frmMessage("ZPL IP is not set.", "AUTOCLOSE");
                    //    frm.ShowDialog();
                    //    return;
                    //}

                    printExecute = true;

                    if (grdGanban.RowCount <= 0)
                    {
                        //프린트 할 ID라벨이 생성되지 않았습니다.
                        frmMessage frm = new frmMessage("No ID label has been created for printing.", "AUTOCLOSE");
                        frm.ShowDialog();
                        return;
                    }

                    if (_ganbanDt.Rows[0]["GANBANID2"].ToString() == "")
                    {
                        //ID2라벨이 생성되지 않았습니다.
                        frmMessage frm = new frmMessage("ID2 label not generated.", "AUTOCLOSE");
                        frm.ShowDialog();
                        return;
                    }

                    if (fromPrint >= 0 && toPrint > 0)
                    {
                        if (toPrint > fromPrint)
                        {
                            for (int i = fromPrint; i < toPrint; i++)
                            {
                                if (_ganbanDt.Rows.Count > i)
                                {
                                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", _ganbanDt.Rows[i]["GANBANID2"].ToString(), "", 0, 0, "", ref _BasicDs);
                                }
                            }
                        }
                        else
                        {
                            //프린트 할 ID라벨이 생성되지 않았습니다.
                            frmMessage frm = new frmMessage("Please check From Number and To Number.", "AUTOCLOSE");
                            frm.ShowDialog();
                            return;
                        }
                    }
                    else
                    {
                        for (int i = 0; i < grdGanban.Rows.Count; i++)
                        {
                            if (grdGanban.Rows[i].Cells[1].Value != null)
                            {
                                if (grdGanban.Rows[i].Cells[1].Value.ToString().ToUpper() == "TRUE")
                                {
                                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", _ganbanDt.Rows[i]["GANBANID2"].ToString(), "", 0, 0, "", ref _BasicDs);
                                }
                            }
                        }
                    }

                    //for (int i = 0; i < _ganbanDt.Rows.Count; i++)
                    //{
                    //    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", _ganbanDt.Rows[i]["GANBANID2"].ToString(), "", 0, 0, "",ref _BasicDs);
                    //}
                }
                else
                {
                    clsReport.delete_files();

                    printExecute = true;
                    string labelId = comboGanban2.SelectedValue.ToString();


                    //라벨 디자인 파일 다운로드
                    DataTable designdt = clsReport.excel_download(labelId);

                    if (designdt == null)
                    {
                        //{labelId}에 대한 라벨 디자인이 존재하지 않습니다.
                        frmMessage frm = new frmMessage($"The label design for {labelId} does not exist.", "AUTOCLOSE");
                        frm.ShowDialog();
                        return;
                    }

                    //품목 이미지 파일 다운로드
                    clsReport.image_download(lblPN.Text);

                    if (fromPrint >= 0 && toPrint > 0)
                    {
                        if (toPrint > fromPrint)
                        {
                            for (int i = fromPrint; i < toPrint; i++)
                            {
                                if (_ganbanDt.Rows.Count > i)
                                {
                                    updateReprintFlag(_ganbanDt.Rows[i]["GANBANID"].ToString(), "Y");
                                }
                            }
                        }
                        else
                        {
                            //프린트 할 ID라벨이 생성되지 않았습니다.
                            frmMessage frm = new frmMessage("Please check From Number and To Number.", "AUTOCLOSE");
                            frm.ShowDialog();
                            return;
                        }
                    }
                    else
                    {
                        for (int i = 0; i < grdGanban.Rows.Count; i++)
                        {
                            if (grdGanban.Rows[i].Cells[1].Value != null)
                            {
                                if (grdGanban.Rows[i].Cells[1].Value.ToString().ToUpper() == "TRUE")
                                {
                                    updateReprintFlag(_ganbanDt.Rows[i]["GANBANID"].ToString(), "Y");
                                }
                            }
                        }
                    }

                    //json 데이터 생성
                    get_ganbanlabel_Jsondata(labelId, "Y");

                    string _Filestr = @"C:\SMARTMOM\MOM.RPT\MOM.RPT.EXE";
                    System.IO.FileInfo fi = new System.IO.FileInfo(_Filestr);
                    if (!fi.Exists)
                    {
                        // REPORT 프로그램이 설치가 안되었습니다.
                        //{labelId}에 대한 라벨 디자인이 존재하지 않습니다.
                        frmMessage frm = new frmMessage("Report program is not installed.", "AUTOCLOSE");
                        frm.ShowDialog();
                        updateReprintFlag("", "N");
                        return;
                    }

                    //프린트실행
                    executePrint();

                    //재발행 여부 원복
                    updateReprintFlag("", "N");
                }
            }
            
            #endregion

            if (!printExecute)
            {
                //프린트 할 항목을 선택해 주십시오.
                frmMessage frm = new frmMessage("Select the item to print.", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            //textBox1.Text = Clipboard.GetText();
            //Clipboard.Clear();
        }

        private void updateReprintFlag (string labelId, string flag)
        {
            DataTable result = new DataTable();

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("WORK_ORDER_ID", lblWO.Text.Trim());
            paramsMap.Add("WORK_ORDER_RESULT_ID", labelId);
            paramsMap.Add("REPRINT_YN", flag);
            paramsList.Add(paramsMap);

            string retvalue = "";

            result = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.update_reprint_flag.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (result == null)
            {
                return;
            }

            if (result.Rows.Count == 0)
            {
                return;
            }
        }

        private void executePrint()
        {
            try
            {
                Process.Start(@"C:\SMARTMOM\MOM.RPT\MOM.RPT.EXE");
            }
            catch (Exception ex)
            {
                // REPORT 프로그램이 설치가 안되었습니다.
                throw new Exception("Report program is not installed.");
            }
        }
        #endregion

        private void txtPrintQty_KeyPress(object sender, KeyPressEventArgs e)
        {
            //숫자만 입력되도록 필터링
            if (!(char.IsDigit(e.KeyChar) || e.KeyChar == Convert.ToChar(Keys.Back)))
            {
                e.Handled = true;
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            frmLabelPrintPreset frm1 = new frmLabelPrintPreset();
            frm1.ShowDialog();
        }

        private void tableLayoutPanel6_Paint(object sender, PaintEventArgs e)
        {

        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
            if (checkBox1.Checked == true)
            {
                txtExtraPlanQty.Text = txtPlanQty.Text;
            }
        }

        private string chkLCMValidation(string itemid)
        {
            string result = "OK";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();

            paramsMap.Add("P_ITEM_ID", itemid);
            paramsMap.Add("P_WORK_ORDER_ID", lblWO.Text.Trim());

            paramsList.Add(paramsMap);

            string retvalue = "";

            _chkLCM = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_lcm_chk.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (_chkLCM == null)
            {
                result = "NG";
            }

            if (_chkLCM.Rows.Count == 0)
            {
                result = "NG";
            }

            if (_chkLCM.Rows[0]["INCH"].ToString() == "")
            {
                result = "INCH";
            }

            if (_chkLCM.Rows[0]["HSCD"].ToString() == "")
            {
                result = "HSCD";
            }

            return result;
        }

        private string chkA4Validation(string itemid)
        {
            string result = "OK";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();

            paramsMap.Add("P_ITEM_ID", itemid);

            paramsList.Add(paramsMap);

            string retvalue = "";

            _chkA4 = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_a4_chk.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (_chkA4 == null)
            {
                result = "NG";
            }

            if (_chkA4.Rows.Count == 0)
            {
                result = "NG";
            }

            if (comboGanban1.SelectedValue.ToString() == "DG-A01")
            {
                if (_chkA4.Rows[0]["LABELDESC"].ToString() == "")
                {
                    result = "LABELDESC";
                }

                if (_chkA4.Rows[0]["MATERIAL"].ToString() == "")
                {
                    result = "MATERIAL";
                }

                if (_chkA4.Rows[0]["COLOR"].ToString() == "")
                {
                    result = "COLOR";
                }
            }

            if (comboGanban1.SelectedValue.ToString() == "DG-A02")
            {
                if (_chkA4.Rows[0]["LABELDESC"].ToString() == "")
                {
                    result = "LABELDESC";
                }

                if (_chkA4.Rows[0]["MATERIAL"].ToString() == "")
                {
                    result = "MATERIAL";
                }
            }

            if (comboGanban1.SelectedValue.ToString() == "PG-B02")
            {
                if (_chkA4.Rows[0]["LABELDESC"].ToString() == "")
                {
                    result = "LABELDESC";
                }
            }

            if (comboGanban1.SelectedValue.ToString() == "DG-B02")
            {
                if (_chkA4.Rows[0]["LABELDESC"].ToString() == "")
                {
                    result = "LABELDESC";
                }

                if (_chkA4.Rows[0]["HSEITEMID"].ToString() == "")
                {
                    result = "HSEITEMID";
                }
            }

            return result;
        }

        private void num_KeyPress(object sender, KeyPressEventArgs e)
        {
            //숫자만 입력되도록 필터링
            if (!(char.IsDigit(e.KeyChar) || e.KeyChar == Convert.ToChar(Keys.Back)))
            {
                e.Handled = true;
            }
        }
    }
}
