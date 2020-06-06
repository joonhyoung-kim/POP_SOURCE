using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Threading;

namespace SmartMOM_POP
{
    public partial class frmMainProductComplete_Poland : Form
    {
        #region 변수 선언
        string _lotType = "";
        bool _search_open_flag = false;
        string _gtType = "";
        string _ctType = "";
        string _palletType = "";
        string _gtLabelType = "";
        string _ctLabelType = "";
        string _palletLabelType = "";
        int _gtQty = 0;
        int _ctQty = 0;
        string _labelspec = "";
        string _labeldesc = "";
        string _work_day = "";
        string _start_time = "";
        string _gridFlag = "grdPackList";
        string _ctLabeltype = "";
        string _wostate = "";
        string firstSet = "OK";
        string inlineFlag = "Y";

        int sntowo_nonworkcnt = 0;
        string sntowo_workorderid = "";
        string sntowo_labeltype = "";
        string sntowo_itemid = "";
        string sntowo_wostate = "";
        string sntowo_sn = "";
        int sntowo_oriqty = 0;
        int sntowo_popganbanqty = 0;
        int sntowo_nonctqty = 0;
        int sntowo_wogoodqty = 0;
        int sntowo_scanqty = 0;

        DataTable _gt_DesignDt = new DataTable();
        DataTable _ct_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();

        DataTable _woDt = new DataTable();
        #endregion

        #region 화면 단축키 설정 부
        private void frmMainProductComplete_Poland_FormClosing(object sender, FormClosingEventArgs e)
        {
            clsStatic.Hotkey_Register(this);
        }


        const int WM_HOTKEY = 0x0312;
        protected override void WndProc(ref Message message)
        {
            switch (message.Msg)
            {
                case WM_HOTKEY:
                    Keys key = (Keys)(((int)message.LParam >> 16) & 0xFFFF);
                    //KeyModifiers modifier = (KeyModifiers)((int)message.LParam & 0xFFFF);
                    //MessageBox.Show("HotKey Pressed :" + modifier.ToString() + " " + key.ToString());

                    if (Keys.F1 == key)
                    {
                        lblRot_Click(null, null);
                    }
                    else if (Keys.F2 == key)
                    {
                        btnNonProd_Click(null, null);
                    }
                    else if (Keys.F6 == key)
                    {
                        button_po_search();
                    }
                    else if (Keys.F7 == key)
                    {
                        clsStatic._dialogValue = "";
                        clsStatic.UnHotkey_Register(this);
                        frmLoginIDInsert frm = new frmLoginIDInsert(lblMakelotqty.Text);
                        frm.ShowDialog();
                        clsStatic.Hotkey_Register(this);
                        if (clsStatic._dialogValue != "")
                        {
                            lblMakelotqty.Text = clsStatic._dialogValue;

                            clsStatic._dialogValue = "";
                        }
                    }
                    else if (Keys.F8 == key)
                    {
                    }
                    else if (Keys.F12 == key)
                    {
                        txtSN_Focus();
                    }
                    break;
            }
            base.WndProc(ref message);
        }
        #endregion

        #region init : 화면
        public frmMainProductComplete_Poland()
        {
            InitializeComponent();

            grdPackList.Dock = DockStyle.Fill;
            grdAllList.Dock = DockStyle.Fill;
            grdBad.Dock = DockStyle.Fill;

            grdAllList.Visible = false;
            grdBad.Visible = false;

            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);

            InitPackList();
            InitAllList();
            InitGanbanList();
            InitBADList();

            initEquipmentnum();

            lblUser.Text = clsStatic._USER_NAME;
            btnWorkType.Text = "-";

            clsStatic.Hotkey_Register(this);

            now_nonwork_load("INIT");

            lblDestination.Text = "LGEMA";

            txtSN.Text = "";
            txtSN.BackColor = Color.Yellow;
            txtSN.Select();
            txtSN.Focus();
        }
        #endregion        

        #region init : 화면 그리드 (netting 제품리스트 / 스캔제품리스트 / 스캔간판리스트 / 불량 리스트)
        #region init : netting 되지 않은 제품 리스트 그리드
        private void InitPackList()
        {
            //                                    0         1                   2      
            string[] headerText = new string[] { "GANBAN", "SN", "QTY" }; // 3
            string[] columnName = new string[] { "CT", "WORKORDERRESULTID", "GOODQTY" };
            string[] columnType = new string[] { "T", "T", "T" };

            int[] columnWidth = new int[] { 200, 300, 100 };
            bool[] columnVisible = new bool[] { true, true, true };
            bool[] columnDisable = new bool[] { true, true, true };
            string[] cellAlign = new string[] { "C", "C", "C" };

            grdPackList.SetBorderAndGridlineStyles();
            grdPackList.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdPackList.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdPackList.RowTemplate.Height = 40;
            grdPackList.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdPackList.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
            grdPackList.BackgroundColor = Color.Black;
            grdPackList.RowsDefaultCellStyle.BackColor = Color.Black;
            grdPackList.RowsDefaultCellStyle.ForeColor = Color.White;
        }
        #endregion

        #region init : 스캔된 제품 리스트 그리드
        private void InitAllList()
        {
            //                                    0         1                   2      
            string[] headerText = new string[] { "GANBAN", "SN", "QTY" }; // 3
            string[] columnName = new string[] { "CT", "WORKORDERRESULTID", "GOODQTY" };
            string[] columnType = new string[] { "T", "T", "T" };

            int[] columnWidth = new int[] { 200, 300, 100 };
            bool[] columnVisible = new bool[] { true, true, true };
            bool[] columnDisable = new bool[] { true, true, true };
            string[] cellAlign = new string[] { "C", "C", "C" };

            grdAllList.SetBorderAndGridlineStyles();
            grdAllList.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdAllList.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdAllList.RowTemplate.Height = 40;
            grdAllList.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdAllList.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
            grdAllList.BackgroundColor = Color.Black;
            grdAllList.RowsDefaultCellStyle.BackColor = Color.Black;
            grdAllList.RowsDefaultCellStyle.ForeColor = Color.White;
        }
        #endregion

        #region init : 스캔 간판 리스트 그리드
        private void InitGanbanList()
        {
            //                                    0          1      2      
            string[] headerText = new string[] { "GANBAN", "QTY"}; // 3
            string[] columnName = new string[] { "GANBANID", "GOODQTY"};
            string[] columnType = new string[] { "T", "T"};

            int[] columnWidth = new int[] { 250, 150};
            bool[] columnVisible = new bool[] { true, true};
            bool[] columnDisable = new bool[] { true, true};
            string[] cellAlign = new string[] { "C", "C"};

            grdGanbanList.SetBorderAndGridlineStyles();
            grdGanbanList.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGanbanList.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdGanbanList.RowTemplate.Height = 40;
            grdGanbanList.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdGanbanList.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
            grdGanbanList.BackgroundColor = Color.Black;
            grdGanbanList.RowsDefaultCellStyle.BackColor = Color.Black;
            grdGanbanList.RowsDefaultCellStyle.ForeColor = Color.White;
        }
        #endregion

        #region init : 불량 리스트 그리드
        private void InitBADList()
        {
            //                                   0                   1      
            string[] headerText = new string[] { "SN", "QTY" }; //2
            string[] columnName = new string[] { "WORKORDERRESULTID", "BADQTY" };
            string[] columnType = new string[] { "T", "T" };

            int[] columnWidth = new int[] { 300, 150 };
            bool[] columnVisible = new bool[] { true, true };
            bool[] columnDisable = new bool[] { true, true };
            string[] cellAlign = new string[] { "C", "C" };

            grdBad.SetBorderAndGridlineStyles();
            grdBad.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdBad.DefaultCellStyle.Font = new Font("맑은고딕", 16, FontStyle.Bold);
            grdBad.RowTemplate.Height = 40;
            grdBad.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdBad.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
            grdBad.BackgroundColor = Color.Black;
            grdBad.RowsDefaultCellStyle.BackColor = Color.Black;
            grdBad.RowsDefaultCellStyle.ForeColor = Color.White;
        }
        #endregion
        #endregion

        #region event : timer tick
        private void timerMessage_Tick(object sender, EventArgs e)
        {
            timerMessage.Enabled = false;
            lblMessage.Text = "";
        }
        #endregion

        #region event : 화면 종료
        private void btnClose_Click(object sender, EventArgs e)
        {
            if (btnPoSearch.Text == "Select")
            {
                this.Close();
            } else
            {
                if (_wostate.Equals("T") || _wostate.Equals("C") || _wostate.Equals("H"))
                {
                    this.Close();
                } else
                {
                    if (btnWorkType.Text.Equals("GANBAN SCAN") || btnWorkType.Text.Equals("GANBAN SCAN(O)"))
                    {
                        frmComplateGanban frm2 = new frmComplateGanban(btnWorkType.Text, lblWOPlanQty.Text, lblWOProdQty.Text, _gtQty);
                        frm2.ShowDialog();

                        if (clsStatic._dialogValue2 != "")
                        {
                            if (clsStatic._dialogValue2 == "NULL")
                            {
                                clsStatic._dialogValue2 = "";
                            }
                            else if (clsStatic._dialogValue2 == "CLOSE")
                            {
                                clsStatic._dialogValue2 = "";
                                return;
                            }
                            else
                            {
                                string value = clsStatic._dialogValue2;
                                string[] result = value.Split(new char[] { '/' });

                                txtSN.Text = result[0];
                                lblMakelotqty.Text = result[1];

                                clsStatic._dialogValue2 = "";

                                string processflag = chkganban();

                                if (processflag.Equals("NG"))
                                {
                                    txtSN.Text = "";
                                    txtSN_Focus();
                                    return;
                                }
                                else
                                {
                                    ganban_insert(txtSN.Text, "F", result[1]);
                                }
                            }
                        }
                        else
                        {
                            return;
                        }
                    }
                    else if (btnWorkType.Text.Equals("ID/GANBAN SCAN") || btnWorkType.Text.Equals("ID/GANBAN SCAN(O)"))
                    {
                        frmComplateGanban frm2 = new frmComplateGanban(btnWorkType.Text, lblWOPlanQty.Text, lblWOProdQty.Text, _gtQty);
                        frm2.ShowDialog();

                        if (clsStatic._dialogValue2 != "")
                        {
                            if (clsStatic._dialogValue2 == "NULL")
                            {
                                clsStatic._dialogValue2 = "";
                            }
                            else if (clsStatic._dialogValue2 == "CLOSE")
                            {
                                clsStatic._dialogValue2 = "";
                                return;
                            }
                            else
                            {
                                string value = clsStatic._dialogValue2;
                                string[] result = value.Split(new char[] { '/' });

                                txtSN.Text = result[0];
                                lblMakelotqty.Text = _gtQty.ToString();

                                clsStatic._dialogValue2 = "";

                                string processflag = chkganban();

                                if (processflag.Equals("NG"))
                                {
                                    txtSN.Text = "";
                                    txtSN_Focus();
                                    return;
                                }
                                else
                                {
                                    ganban_insert(txtSN.Text, "F", _gtQty.ToString());
                                }
                            }
                        }
                        else
                        {
                            return;
                        }
                    }
                    else if (btnWorkType.Text.Equals("Online") || btnWorkType.Text.Equals("Online(O)"))
                    {
                        // 현재 시점으로 Online 간판 발급
                        if (_gtQty > 0)
                        {
                            string ganbanId = online_ganban_insert(_gtQty);
                            lblMakelotqty.Text = _gtQty.ToString();
                            ganban_insert(ganbanId, "F", _gtQty.ToString());
                            clsLabelSet.label_print2(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", ganbanId, "", 0, 0, btnLEDLot.Text, btnPressLot.Text, "", ref _BasicDs);
                        }
                    }
                    this.Close();

                }
            }
        }
        #endregion

        #region event : 작업 인원 클릭
        private void btnPerson_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(clsStatic._PERSONCOUNT);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                clsStatic._PERSONCOUNT = clsStatic._dialogValue;

                btnPerson.Text = "Person(" + clsStatic._PERSONCOUNT + ")";

                clsStatic._dialogValue = "";
            }
        }
        #endregion

        #region event : 작업지시서 조회 >>  wo_search(string destinationFlag)
        // 작업지시서 조회
        private void btnPoSearch_Click(object sender, EventArgs e)
        {
            //if (int.Parse(clsStatic._EQUIPMENT_NUM) > 0 && clsStatic._EQUIPMENT_CD.Equals(""))
            //{
            //    //toMessage("설비를 먼저 선택하여 주세요!");
            //    toMessage("Please select EQUIPMENT first.");
            //    txtSN_Focus();
            //    return;
            //}

            button_po_search();
        }

        // 작업지시서 조회 팝업 호출 및 작업지시서 조회 액션
        private void button_po_search()
        {

            string tmpWorkorderid = clsStatic._WORK_ORDER_ID;
            clsStatic._WORK_ORDER_ID = "";

            _search_open_flag = true;

            clsStatic.UnHotkey_Register(this);
            frmPOSearch frm = new frmPOSearch("ALL");
            frm.ShowDialog();
            clsStatic.Hotkey_Register(this);

            _search_open_flag = false;
            //tableMain.SuspendLayout();
            //panel1.SuspendLayout();
            //tableLayoutPanel3.SuspendLayout();
            //tableLayoutPanel4.SuspendLayout();
            // 작업지시서 가 선택된 경우
            if (clsStatic._WORK_ORDER_ID != "")
            {
                // 작업지시서 조회
                firstSet = "OK";
                wo_search("OK");
                getBadgrid();
                getganbanGrid();
                firstSet = "NG";
            }
            else
            {
                clsStatic._WORK_ORDER_ID = tmpWorkorderid;
            }

            //tableMain.ResumeLayout();
            //panel1.ResumeLayout();
            //tableLayoutPanel3.ResumeLayout();
            //tableLayoutPanel4.ResumeLayout();
            txtSN_Focus();
        }
        #endregion

        #region event : Online 제품의 LED LOT No. / PRESS No. 입력창 호출 및 Setting
        private void btnLEDLot_Click(object sender, EventArgs e)
        {
            if (_ctLabelType == "ROLL" && _lotType == "SN")
            {
                clsStatic._dialogValue = "";

                frmLEDLot frm = new frmLEDLot(_ctType);
                frm.ShowDialog();

                if (clsStatic._dialogValue != "")
                {
                    string value = clsStatic._dialogValue;
                    string[] result = value.Split(new char[] { '/' });

                    btnLEDLot.Text = result[0];
                    btnPressLot.Text = result[1];

                    clsStatic._dialogValue = "";
                }
            }
        }
        #endregion

        #region event : 불량등록 클릭
        private void btnBadQty_Click(object sender, EventArgs e)
        {
            if (btnPoSearch.Text == "Select")
            {
                //toMessage("작업지시를 먼저 선택하여 주세요!");
                toMessage("Please select WORKORDER first.");
                txtSN_Focus();
                return;
            }

            button_badqty();
        }

        private void button_badqty()
        {
            if (_wostate != "R")
            {
                //frmWOMessage frm1 = new frmWOMessage("작업지시가 완료되어 불량등록이 불가능합니다.", 2);
                frmWOMessage frm1 = new frmWOMessage("WORKORDER is completed and bad registration is impossible.", 2);
                frm1.ShowDialog();
                return;
            }

            if (_work_day == "")
            {
                today_info_load();
                result_info_load();
            }

            clsStatic._dialogValue = "";
            frmBadProductInsert frm = new frmBadProductInsert(btnPoSearch.Text, "1", clsStatic._SHIFT_ID, _work_day, _start_time, "", "", _ctLabelType);
            frm.ShowDialog();

            if (clsStatic._dialogValue == "OK")
            {
                wo_search("NO");
                getBadgrid();
            }
        }
        #endregion

        #region event : 향지 클릭 >> frmCommonSelect(string selectType) : 현재 미구현
        private void lblDestination_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "DESTINATION";
            clsStatic._dialogValue = "";
            frmCommonSelect frm = new frmCommonSelect("향지");
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblDestination.Text = clsStatic._dialogValue;
                clsStatic._dialogValue = "";
            }
        }
        #endregion

        #region event : 비가동 클릭 >> now_nonwork_load(string initFlag)
        private void btnNonProd_Click(object sender, EventArgs e)
        {
            now_nonwork_load("LOSS");
        }
        #endregion

        #region event : Display Rotation 클릭 (하단 그리드 전환 버튼)
        private void lblRot_Click(object sender, EventArgs e)
        {
            if (_gridFlag == "grdPackList")
            {
                grdPackList.Visible = false;
                grdAllList.Visible = true;
                grdBad.Visible = false;
                _gridFlag = "grdAllList";
                lblPackTitle.Text = "All Packing List";
            }
            else if (_gridFlag == "grdAllList")
            {
                grdPackList.Visible = false;
                grdAllList.Visible = false;
                grdBad.Visible = true;
                _gridFlag = "grdBadList";
                lblPackTitle.Text = "NG List";
            }
            else if (_gridFlag == "grdBadList")
            {
                grdPackList.Visible = true;
                grdAllList.Visible = false;
                grdBad.Visible = false;
                _gridFlag = "grdPackList";
                lblPackTitle.Text = "Packing List";
            }
        }
        #endregion

        #region event : 초기화 클릭
        private void btnInit_Click(object sender, EventArgs e)
        {
            //frmMessage frm = new frmMessage("화면을 초기화 하겠습니까?", "OK_CANCEL");
            frmMessage frm = new frmMessage("Do you want to reset the screen?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                init_process();
            }
        }
        #endregion

        #region event : 타이틀 클릭 >> wo_search(string destinationFlag)
        private void btnTitle_Click(object sender, EventArgs e)
        {
            wo_search("NO");
            txtSN_Focus();
        }
        #endregion

        #region event : 장입수량 클릭 >> keypadEvent(lblMakelotqty);
        private void lblMakelotqty_Click(object sender, EventArgs e)
        {
            if (btnWorkType.Text.Equals("Online") || btnWorkType.Text.Equals("Online(O)"))
            {
                keypadEvent(lblMakelotqty);
            } else
            {
                return;
            }
            
        }
        #endregion

        #region event : 작업지시서 상태변경 클릭
        private void btnHalt_Click(object sender, EventArgs e)
        {
            if (btnPoSearch.Text == "Select")
            {
                return;
            }

            clsStatic._dialogValue = "";
            //frmWOMessage frm = new frmWOMessage("작업지시 상태를 변경하겠습니까?", "", "Complete", "Halt", "Close", "T", "H", "");
            frmWOMessage frm = new frmWOMessage("Do you want to change the WORKORDER status?", "", "Complete", "Halt", "Close", "T", "H", "");
            frm.ShowDialog();

            if (clsStatic._dialogValue == "")
            {
                return;
            }

            if ((clsStatic._dialogValue == "T" || clsStatic._dialogValue == "H"))
            {
                if (btnWorkType.Text.Equals("GANBAN SCAN") || btnWorkType.Text.Equals("GANBAN SCAN(O)"))
                {
                    frmComplateGanban frm2 = new frmComplateGanban(btnWorkType.Text, lblWOPlanQty.Text, lblWOProdQty.Text, _gtQty);
                    frm2.ShowDialog();

                    if (clsStatic._dialogValue2 != "")
                    {
                        if (clsStatic._dialogValue2 == "NULL")
                        {
                            clsStatic._dialogValue2 = "";
                        }
                        else if (clsStatic._dialogValue2 == "CLOSE")
                        {
                            clsStatic._dialogValue2 = "";
                            return;
                        }
                        else
                        {
                            string value = clsStatic._dialogValue2;
                            string[] result = value.Split(new char[] { '/' });

                            txtSN.Text = result[0];
                            lblMakelotqty.Text = result[1];

                            clsStatic._dialogValue2 = "";

                            string processflag = chkganban();

                            if (processflag.Equals("NG"))
                            {
                                txtSN.Text = "";
                                txtSN_Focus();
                                return;
                            } else
                            {
                                ganban_insert(txtSN.Text, "F", result[1]);
                            }
                        }
                    }
                    else
                    {
                        return;
                    }
                }
                else if (btnWorkType.Text.Equals("ID/GANBAN SCAN") || btnWorkType.Text.Equals("ID/GANBAN SCAN(O)"))
                {
                    frmComplateGanban frm2 = new frmComplateGanban(btnWorkType.Text, lblWOPlanQty.Text, lblWOProdQty.Text, _gtQty);
                    frm2.ShowDialog();

                    if (clsStatic._dialogValue2 != "")
                    {
                        if (clsStatic._dialogValue2 == "NULL")
                        {
                            clsStatic._dialogValue2 = "";
                        }
                        else if (clsStatic._dialogValue2 == "CLOSE")
                        {
                            clsStatic._dialogValue2 = "";
                            return;
                        }
                        else
                        {
                            string value = clsStatic._dialogValue2;
                            string[] result = value.Split(new char[] { '/' });

                            txtSN.Text = result[0];
                            lblMakelotqty.Text = _gtQty.ToString();

                            clsStatic._dialogValue2 = "";

                            string processflag = chkganban();

                            if (processflag.Equals("NG"))
                            {
                                txtSN.Text = "";
                                txtSN_Focus();
                                return;
                            }
                            else
                            {
                                ganban_insert(txtSN.Text, "F", _gtQty.ToString());
                            }
                        }
                    }
                    else
                    {
                        return;
                    }
                }
                else if (btnWorkType.Text.Equals("Online") || btnWorkType.Text.Equals("Online(O)"))
                {
                    // 현재 시점으로 Online 간판 발급
                    if (_gtQty > 0)
                    {
                        string ganbanId = online_ganban_insert(_gtQty);
                        lblMakelotqty.Text = _gtQty.ToString();
                        ganban_insert(ganbanId, "F", _gtQty.ToString());
                        clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", ganbanId, "", 0, 0, "", ref _BasicDs);
                    }
                }

                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("p_err_msg", "");
                paramsMap.Add("p_runCount", "");
                paramsMap.Add("p_ctnumber", "");
                paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
                paramsMap.Add("P_NOWSTATE", clsStatic._dialogValue);
                paramsMap.Add("P_PRESTATE", _wostate);
                paramsMap.Add("P_ITEM_ID", lblItem.Text);
                paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

                paramsList.Add(paramsMap);

                string retvalue = "";

                DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopwoupdate_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                if (dt.Rows[0]["p_err_code"].ToString() == "NG")
                {
                    toMessage(dt.Rows[0]["p_err_msg"].ToString());
                    return;
                } else
                {
                    init_process();
                    return;
                }

            }

            wo_search("OK");
            clsStatic._dialogValue = "";
            txtSN_Focus();
        }
        #endregion

        #region event : 바코드 스캔 부
        private void txtSN_Leave(object sender, EventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Chartreuse;
            }
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Yellow;
            }
        }

        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (txtSN.Text.Trim() == "")
                {
                    return;
                }

                //if (int.Parse(clsStatic._EQUIPMENT_NUM) > 0 && clsStatic._EQUIPMENT_CD.Equals(""))
                //{
                //    //toMessage("설비를 먼저 선택하여 주세요!");
                //    toMessage("Please select EQUIPMENT first.");
                //    txtSN.Text = "";
                //    txtSN_Focus();
                //    return;
                //}

                if (_work_day == "")
                {
                    today_info_load();
                    result_info_load();
                    if (_work_day == "" && _start_time == "")
                    {
                        //frmWOMessage frm = new frmWOMessage("설비 Schedule 정보가 없습니다.", 2);
                        frmWOMessage frm = new frmWOMessage("There is no facility schedule information.", 2);
                        frm.ShowDialog();
                        init_process();
                        return;
                    }

                }
                 
                DataRow[] drs = getbadnoncode(txtSN.Text);

                if (drs != null)
                {
                    string codetype = drs[0]["CODETYPE"].ToString();
                    string codeid = drs[0]["CODEID"].ToString();
                    string codename = drs[0]["CODENAME"].ToString();

                    if (codetype == "NONWORK")
                    {
                        string nontype = codeid;
                        string nowclassid = drs[0]["NONCLASSID"].ToString();
                        string nowworkcd = drs[0]["NONWORKCD"].ToString();

                        frmNonProdTime frm = new frmNonProdTime(codename, _work_day, nowclassid, nowworkcd, nontype, "START");
                        frm.ShowDialog();
                        return;
                    }
                    else if (codetype == "BADCODE")
                    {
                        frmBadProductInsert frm = new frmBadProductInsert(btnPoSearch.Text, "1", clsStatic._SHIFT_ID, _work_day, _start_time, codeid, codename, _ctLabeltype);
                        wo_search("NG");
                        txtSN.Text = "";
                        txtSN_Focus();
                        return;
                    }
                }

                if (txtSN.Text.Trim().Length < 8)
                {
                    //frmWOMessage frm = new frmWOMessage("존재하지 않는 ID라벨입니다.", 2);
                    frmWOMessage frm = new frmWOMessage("ID label does not exist.", 2);
                    frm.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }

                if (txtSN.Text.Trim() == "COMPLETED")
                {
                    if (btnPoSearch.Text != "Select")
                    {
                        if (btnWorkType.Text.Equals("GANBAN SCAN") || btnWorkType.Text.Equals("GANBAN SCAN(O)"))
                        {
                            frmComplateGanban frm2 = new frmComplateGanban(btnWorkType.Text, lblWOPlanQty.Text, lblWOProdQty.Text, _gtQty);
                            frm2.ShowDialog();

                            if (clsStatic._dialogValue2 != "")
                            {
                                if (clsStatic._dialogValue2 == "NULL")
                                {
                                    clsStatic._dialogValue2 = "";
                                }
                                else if (clsStatic._dialogValue2 == "CLOSE")
                                {
                                    clsStatic._dialogValue2 = "";
                                    return;
                                }
                                else
                                {
                                    string value = clsStatic._dialogValue2;
                                    string[] result = value.Split(new char[] { '/' });

                                    txtSN.Text = result[0];
                                    lblMakelotqty.Text = result[1];

                                    clsStatic._dialogValue2 = "";

                                    string chk = chkganban();

                                    if (chk.Equals("NG"))
                                    {
                                        txtSN.Text = "";
                                        txtSN_Focus();
                                        return;
                                    }
                                    else
                                    {
                                        ganban_insert(txtSN.Text, "F", result[1]);
                                    }
                                }
                            }
                            else
                            {
                                return;
                            }
                        }
                        else if (btnWorkType.Text.Equals("ID/GANBAN SCAN") || btnWorkType.Text.Equals("ID/GANBAN SCAN(O)"))
                        {
                            frmComplateGanban frm2 = new frmComplateGanban(btnWorkType.Text, lblWOPlanQty.Text, lblWOProdQty.Text, _gtQty);
                            frm2.ShowDialog();

                            if (clsStatic._dialogValue2 != "")
                            {
                                if (clsStatic._dialogValue2 == "NULL")
                                {
                                    clsStatic._dialogValue2 = "";
                                }
                                else if (clsStatic._dialogValue2 == "CLOSE")
                                {
                                    clsStatic._dialogValue2 = "";
                                    return;
                                }
                                else
                                {
                                    string value = clsStatic._dialogValue2;
                                    string[] result = value.Split(new char[] { '/' });

                                    txtSN.Text = result[0];
                                    lblMakelotqty.Text = _gtQty.ToString();

                                    clsStatic._dialogValue2 = "";

                                    string chk = chkganban();

                                    if (chk.Equals("NG"))
                                    {
                                        txtSN.Text = "";
                                        txtSN_Focus();
                                        return;
                                    }
                                    else
                                    {
                                        ganban_insert(txtSN.Text, "F", _gtQty.ToString());
                                    }
                                }
                            }
                            else
                            {
                                return;
                            }
                        }
                        else if (btnWorkType.Text.Equals("Online") || btnWorkType.Text.Equals("Online(O)"))
                        {
                            // 현재 시점으로 Online 간판 발급
                            if (_gtQty > 0)
                            {
                                string ganbanId = online_ganban_insert(_gtQty);
                                lblMakelotqty.Text = _gtQty.ToString();
                                ganban_insert(ganbanId, "F", _gtQty.ToString());
                                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", ganbanId, "", 0, 0, "", ref _BasicDs);
                            }
                        }

                        List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                        Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                        paramsMap.Add("p_err_code", "");
                        paramsMap.Add("p_err_msg", "");
                        paramsMap.Add("p_runCount", "");
                        paramsMap.Add("p_ctnumber", "");
                        paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                        paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                        paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
                        paramsMap.Add("P_NOWSTATE", "T");
                        paramsMap.Add("P_PRESTATE", _wostate);
                        paramsMap.Add("P_ITEM_ID", lblItem.Text);
                        paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

                        paramsList.Add(paramsMap);

                        string retvalue = "";

                        DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopwoupdate_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                        if (dt.Rows[0]["p_err_code"].ToString() == "NG")
                        {
                            toMessage(dt.Rows[0]["p_err_msg"].ToString());
                            return;
                        }
                        else
                        {
                            init_process();
                            return;
                        }
                    }

                    wo_search("OK");
                    clsStatic._dialogValue = "";
                    txtSN_Focus();
                    return;
                }

                string processflag = sntowo();

                if (!processflag.Equals("OK"))
                {
                    if (sntowo_nonworkcnt > 0)
                    {
                        init_process();
                        now_nonwork_load("LOSS");
                        return;
                    } else
                    {
                        txtSN.Text = "";
                        txtSN_Focus();
                        return;
                    }
                }

                if (txtSN.Text.Trim().Length == 8)
                {
                    // ganban scan
                    if (txtSN.Text.Trim().Substring(0, 1) == "C" && (btnWorkType.Text == "ID/GANBAN SCAN" || btnWorkType.Text == "ID/GANBAN SCAN(O)" || btnWorkType.Text == "GANBAN SCAN" || btnWorkType.Text == "GANBAN SCAN(O)" || btnWorkType.Text == "Online" || btnWorkType.Text == "Online(O)"))
                    {
                        string ganbanInsRes = "OK";
                        
                        if (sntowo_wogoodqty > 0 && sntowo_oriqty != sntowo_wogoodqty)
                        {
                            //frmMessage frm = new frmMessage("실적을 취소하시겠습니까?" + "(" + txtSN.Text + ")", "OK_CANCEL");
                            frmMessage frm = new frmMessage("Do you want to cancel the result?" + "(" + txtSN.Text + ")", "OK_CANCEL");
                            DialogResult result = frm.ShowDialog();
                            if (result == DialogResult.OK)
                            {
                                ganban_cancel(txtSN.Text.Trim());
                                wo_search("OK");
                                getganbanGrid();
                                txtSN.Text = "";
                                txtSN_Focus();
                                return;
                            } else
                            {
                                txtSN.Text = "";
                                txtSN_Focus();
                                return;
                            }
                        } else if (sntowo_wogoodqty > 0 && sntowo_oriqty == sntowo_wogoodqty)
                        {
                            //frmWOMessage frm1 = new frmWOMessage("정확한 간반라벨을 스캔하여 주세요.", 2);
                            frmWOMessage frm1 = new frmWOMessage("Please scan the correct GANBAN label.", 2);
                            frm1.ShowDialog();
                            txtSN.Text = "";
                            txtSN_Focus();
                            return;
                        }
                        

                        // ID / GANBAN 스캔의 경우
                        if (btnWorkType.Text == "ID/GANBAN SCAN" || btnWorkType.Text == "ID/GANBAN SCAN(O)")
                        {
                            // 스캔 실적이 간판수량보다 작을경우 = NG
                            // sntowo_nonctqty = 간판 매핑안된 제품 실적
                            // sntowo_oriqty = 간판 발행시 간판 실적 수량
                            if (sntowo_nonctqty < sntowo_oriqty)
                            {
                                int planQty = int.Parse(lblWOPlanQty.Text.Replace(",", ""));
                                int prodQty = int.Parse(lblWOProdQty.Text.Replace(",", "")) + _gtQty;

                                // ID 라벨 수량이 계획수량과 동일한 경우 간판 스캔으로 작지 종료 시도 Case
                                if (planQty == prodQty)
                                {
                                    // 작업 지시서 종료
                                    clsStatic._dialogValue = "";
                                    //frmWOMessage frm1 = new frmWOMessage("작업지시서를 종료 하시겠습니까?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                                    frmWOMessage frm1 = new frmWOMessage("Do you want to Complete the work order?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                                    
                                    frm1.ShowDialog();

                                    if (clsStatic._dialogValue.Equals("T"))
                                    {
                                        ganbanInsRes = ganban_insert2(txtSN.Text.Trim(), "T", lblMakelotqty.Text);

                                        List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                                        Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                                        paramsMap.Add("p_err_code", "");
                                        paramsMap.Add("p_err_msg", "");
                                        paramsMap.Add("p_runCount", "");
                                        paramsMap.Add("p_ctnumber", "");
                                        paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                                        paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                                        paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
                                        paramsMap.Add("P_NOWSTATE", clsStatic._dialogValue);
                                        paramsMap.Add("P_PRESTATE", _wostate);
                                        paramsMap.Add("P_ITEM_ID", lblItem.Text);
                                        paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

                                        paramsList.Add(paramsMap);

                                        string retvalue = "";

                                        DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopwoupdate_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                                        clsStatic._dialogValue = "";

                                        if (dt.Rows[0]["p_err_code"].ToString() == "NG")
                                        {
                                            toMessage(dt.Rows[0]["p_err_msg"].ToString());
                                            return;
                                        }

                                        init_process();
                                        return;
                                    }
                                    else
                                    {
                                        clsStatic._dialogValue = "";
                                        wo_search("OK");
                                        txtSN.Text = "";
                                        txtSN_Focus();
                                        return;
                                    }
                                }else if (btnWorkType.Text == "ID/GANBAN SCAN(O)" && _gtQty < int.Parse(lblMakelotqty.Text.Replace(",", "")))
                                {
                                    // 작업 지시서 종료
                                    clsStatic._dialogValue = "";
                                    //frmWOMessage frm1 = new frmWOMessage("작업지시서를 종료 하시겠습니까?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                                    frmWOMessage frm1 = new frmWOMessage("Do you want to Complete the work order?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                                    frm1.ShowDialog();

                                    if (clsStatic._dialogValue.Equals("T"))
                                    {
                                        ganbanInsRes = ganban_insert2(txtSN.Text.Trim(), "T", lblMakelotqty.Text);
                                        List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                                        Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                                        paramsMap.Add("p_err_code", "");
                                        paramsMap.Add("p_err_msg", "");
                                        paramsMap.Add("p_runCount", "");
                                        paramsMap.Add("p_ctnumber", "");
                                        paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                                        paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                                        paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
                                        paramsMap.Add("P_NOWSTATE", clsStatic._dialogValue);
                                        paramsMap.Add("P_PRESTATE", _wostate);
                                        paramsMap.Add("P_ITEM_ID", lblItem.Text);
                                        paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

                                        paramsList.Add(paramsMap);

                                        string retvalue = "";

                                        DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopwoupdate_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                                        clsStatic._dialogValue = "";

                                        if (dt.Rows[0]["p_err_code"].ToString() == "NG")
                                        {
                                            toMessage(dt.Rows[0]["p_err_msg"].ToString());
                                            return;
                                        }

                                        init_process();
                                        return;
                                    }
                                    else
                                    {
                                        clsStatic._dialogValue = "";
                                        wo_search("OK");
                                        txtSN.Text = "";
                                        txtSN_Focus();
                                        return;
                                    }
                                }
                                else
                                {
                                    //frmWOMessage frm1 = new frmWOMessage("스캔한 실적수량이 간판라벨의 수량보다 부족합니다.", 2);
                                    frmWOMessage frm1 = new frmWOMessage("Scanned Qty is less than Qty of GANBAN label.", 2);
                                    frm1.ShowDialog();
                                    txtSN.Text = "";
                                    txtSN_Focus();
                                    return;
                                }
                            } else
                            {
                                int planQty = int.Parse(lblWOPlanQty.Text.Replace(",", ""));
                                int prodQty = int.Parse(lblWOProdQty.Text.Replace(",", "")) + _gtQty;

                                // ID 라벨 수량이 계획수량과 동일한 경우 간판 스캔으로 작지 종료 시도 Case
                                if (_gtQty > int.Parse(lblMakelotqty.Text.Replace(",", "")))
                                {
                                    ganbanInsRes = ganban_insert2(txtSN.Text.Trim(), "R", lblMakelotqty.Text);
                                    wo_search("OK");
                                    getganbanGrid();
                                    txtSN.Text = "";
                                    txtSN_Focus();
                                    return;
                                }
                                else if (planQty == prodQty)
                                {
                                    // 작업 지시서 종료
                                    clsStatic._dialogValue = "";
                                    //frmWOMessage frm1 = new frmWOMessage("작업지시서를 종료 하시겠습니까?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                                    frmWOMessage frm1 = new frmWOMessage("Do you want to Complete the work order?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                                    frm1.ShowDialog();

                                    if (clsStatic._dialogValue.Equals("T"))
                                    {
                                        ganbanInsRes = ganban_insert2(txtSN.Text.Trim(), "T", lblMakelotqty.Text);

                                        List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                                        Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                                        paramsMap.Add("p_err_code", "");
                                        paramsMap.Add("p_err_msg", "");
                                        paramsMap.Add("p_runCount", "");
                                        paramsMap.Add("p_ctnumber", "");
                                        paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                                        paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                                        paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
                                        paramsMap.Add("P_NOWSTATE", clsStatic._dialogValue);
                                        paramsMap.Add("P_PRESTATE", _wostate);
                                        paramsMap.Add("P_ITEM_ID", lblItem.Text);
                                        paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

                                        paramsList.Add(paramsMap);

                                        string retvalue = "";

                                        DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopwoupdate_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                                        clsStatic._dialogValue = "";

                                        if (dt.Rows[0]["p_err_code"].ToString() == "NG")
                                        {
                                            toMessage(dt.Rows[0]["p_err_msg"].ToString());
                                            return;
                                        }

                                        init_process();
                                        return;
                                    }
                                } else
                                {
                                    ganbanInsRes = ganban_insert2(txtSN.Text.Trim(), "R", lblMakelotqty.Text);
                                    wo_search("OK");
                                    getganbanGrid();
                                    txtSN.Text = "";
                                    txtSN_Focus();
                                    return;
                                }
                            }
                        } else if (btnWorkType.Text == "GANBAN SCAN" || btnWorkType.Text == "GANBAN SCAN(O)" || btnWorkType.Text == "Online" || btnWorkType.Text == "Online(O)")
                        {
                            if (sntowo_oriqty != 0)
                            {
                                if (btnWorkType.Text.Equals("GANBAN SCAN(O)") || btnWorkType.Text.Equals("Online(O)"))
                                {
                                    ganbanInsRes = ganban_insert2(txtSN.Text.Trim(), "R", lblMakelotqty.Text);
                                }
                                else
                                {
                                    int planQty = int.Parse(lblWOPlanQty.Text.ToString().Replace(",", ""));
                                    int prodQty = int.Parse(lblWOProdQty.Text.ToString().Replace(",", "")) + int.Parse(lblMakelotqty.Text.ToString().Replace(",", ""));

                                    //if (planQty < prodQty)
                                    //{
                                    //    //frmMessage frm = new frmMessage("초과 생산 하시겠습니까?", "OK_CANCEL");
                                    //    frmMessage frm = new frmMessage("Do you want to overproduce?", "OK_CANCEL");
                                    //    DialogResult result2 = frm.ShowDialog();

                                    //    if (result2 == DialogResult.OK)
                                    //    {
                                    //        btnWorkType.Text = btnWorkType.Text + "(O)";
                                    //        ganbanInsRes = ganban_insert2(txtSN.Text.Trim(), "R", lblMakelotqty.Text);
                                    //    }
                                    //}
                                    if (planQty <= prodQty)
                                    {
                                        clsStatic._dialogValue = "";
                                        //frmWOMessage frm1 = new frmWOMessage("작업지시서를 종료 하시겠습니까?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                                        frmWOMessage frm1 = new frmWOMessage("Do you want to Complete the work order?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                                        frm1.ShowDialog();

                                        if (clsStatic._dialogValue.Equals("T"))
                                        {
                                            ganbanInsRes = ganban_insert2(txtSN.Text.Trim(), "T", lblMakelotqty.Text);

                                            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                                            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                                            paramsMap.Add("p_err_code", "");
                                            paramsMap.Add("p_err_msg", "");
                                            paramsMap.Add("p_runCount", "");
                                            paramsMap.Add("p_ctnumber", "");
                                            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                                            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                                            paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
                                            paramsMap.Add("P_NOWSTATE", clsStatic._dialogValue);
                                            paramsMap.Add("P_PRESTATE", _wostate);
                                            paramsMap.Add("P_ITEM_ID", lblItem.Text);
                                            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

                                            paramsList.Add(paramsMap);

                                            string retvalue = "";

                                            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopwoupdate_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                                            clsStatic._dialogValue = "";

                                            if (dt.Rows[0]["p_err_code"].ToString() == "NG")
                                            {
                                                toMessage(dt.Rows[0]["p_err_msg"].ToString());
                                                return;
                                            }

                                            init_process();
                                            return;
                                        }
                                    }
                                    else
                                    {
                                        ganbanInsRes = ganban_insert2(txtSN.Text.Trim(), "R", lblMakelotqty.Text);
                                    }
                                }
                            } else
                            {
                                frmLoginIDInsert frm = new frmLoginIDInsert("");
                                frm.ShowDialog();

                                if (clsStatic._dialogValue != "")
                                {
                                    int planQty = int.Parse(lblWOPlanQty.Text.ToString().Replace(",", ""));
                                    int prodQty = int.Parse(lblWOProdQty.Text.ToString().Replace(",", "")) + int.Parse(clsStatic._dialogValue);

                                    //if (planQty == prodQty)
                                    if (planQty <= prodQty)
                                    {
                                        clsStatic._dialogValue = "";
                                        //frmWOMessage frm1 = new frmWOMessage("작업지시서를 종료 하시겠습니까?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                                        frmWOMessage frm1 = new frmWOMessage("Do you want to Complete the work order?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                                        frm1.ShowDialog();

                                        if (clsStatic._dialogValue.Equals("T"))
                                        {
                                            ganbanInsRes = ganban_insert2(txtSN.Text.Trim(), "T", clsStatic._dialogValue);
                                            lblMakelotqty.Text = int.Parse(clsStatic._dialogValue).ToString("#####0");
                                            clsStatic._dialogValue = "";

                                            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                                            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                                            paramsMap.Add("p_err_code", "");
                                            paramsMap.Add("p_err_msg", "");
                                            paramsMap.Add("p_runCount", "");
                                            paramsMap.Add("p_ctnumber", "");
                                            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                                            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                                            paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
                                            paramsMap.Add("P_NOWSTATE", clsStatic._dialogValue);
                                            paramsMap.Add("P_PRESTATE", _wostate);
                                            paramsMap.Add("P_ITEM_ID", lblItem.Text);
                                            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

                                            paramsList.Add(paramsMap);

                                            string retvalue = "";

                                            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopwoupdate_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                                            clsStatic._dialogValue = "";

                                            if (dt.Rows[0]["p_err_code"].ToString() == "NG")
                                            {
                                                toMessage(dt.Rows[0]["p_err_msg"].ToString());
                                                return;
                                            }

                                            init_process();
                                            return;
                                        }
                                    }
                                    else
                                    {
                                        ganbanInsRes = ganban_insert2(txtSN.Text.Trim(), "R", clsStatic._dialogValue);
                                        lblMakelotqty.Text = int.Parse(clsStatic._dialogValue).ToString("#####0");
                                        clsStatic._dialogValue = "";
                                    }
                                    Thread.Sleep(500);
                                }
                            }
                        }

                        if (ganbanInsRes.Equals("NG"))
                        {
                            wo_search("OK");
                            getganbanGrid();
                            clsStatic._dialogValue = "";
                            txtSN_Focus();
                            return;
                        }

                        wo_search("OK");
                        getganbanGrid();
                        txtSN.Text = "";
                        txtSN_Focus();
                        return;
                    }
                    else
                    {
                        //frmWOMessage frm1 = new frmWOMessage("정확한 간반라벨을 스캔하여 주세요.", 2);
                        frmWOMessage frm1 = new frmWOMessage("Please scan the correct GANBAN label.", 2);
                        frm1.ShowDialog();
                        txtSN.Text = "";
                        txtSN_Focus();
                    }
                    return;
                }
                else if (txtSN.Text.Trim().Length != 8 && btnWorkType.Text == "Ganban Scan")
                {
                    //frmWOMessage frm1 = new frmWOMessage("정확한 간반라벨을 스캔하여 주세요.", 2);
                    frmWOMessage frm1 = new frmWOMessage("Please scan the correct GANBAN label.", 2);
                    frm1.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }

                if (_wostate == "T")
                {
                    //frmWOMessage frm1 = new frmWOMessage("작업지시가 완료되어 실적 입력이 불가능 합니다.", 2);
                    frmWOMessage frm1 = new frmWOMessage("WORKORDER is completed and result registration is impossible.", 2);
                    frm1.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                } else if (_wostate == "C")
                {
                    //frmWOMessage frm1 = new frmWOMessage("작업지시가 취소되어 실적 입력이 불가능 합니다.", 2);
                    frmWOMessage frm1 = new frmWOMessage("WORKORDER is canceled and result registration is impossible.", 2);
                    frm1.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                } else

                if (_wostate != "R" && _wostate != "A" && _wostate != "H")
                {
                    //frmWOMessage frm = new frmWOMessage("먼저 작업지시를 Start 하세요!", 5);
                    frmWOMessage frm = new frmWOMessage("Start WORKORDER first.", 5);
                    frm.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }

                if (btnWorkType.Text.Equals("GANBAN SCAN") || btnWorkType.Text.Equals("GANBAN SCAN(O)"))
                {
                    //frmWOMessage frm1 = new frmWOMessage("정확한 간반라벨을 스캔하여 주세요.", 2);
                    frmWOMessage frm1 = new frmWOMessage("Please scan the correct GANBAN label.", 2);
                    frm1.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }

                if (btnWorkType.Text.Equals("ID/GANBAN SCAN") || btnWorkType.Text.Equals("ID/GANBAN SCAN(O)") || btnWorkType.Text.Equals("Online") || btnWorkType.Text.Equals("Online(O)"))
                {
                    // 제품라벨 스캔
                    product_insert(txtSN.Text);
                    

                    txtSN.Text = "";
                }
            }
        }
        #endregion

        #region method : 화면 초기화
        private void init_process()
        {
            btnPoSearch.Text = "Select";
            lblItem.Text = "";
            lblItemdesc.Text = "";
            lblDayPlanQty.Text = "0";
            lblDayProdQty.Text = "0";
            lblDayNGQty.Text = "0";
            lblWOPlanQty.Text = "0";
            lblWOProdQty.Text = "0";
            lblWONGQty.Text = "0";
            lblMakelotqty.Text = "0";
            btnLEDLot.Text = "";
            btnPressLot.Text = "";
            txtSN.Text = "";
            lblBoxCount.Text = "";
            lblGanbanQty.Text = "";
            grdPackList.RemoveAll();
            grdAllList.RemoveAll();
            grdBad.RemoveAll();
            grdGanbanList.RemoveAll();

            label10.BackColor = Color.Black;
            label10.Text = "Inline-N";
            inlineFlag = "N";
        }
        #endregion

        #region method : 간판 실적 등록 ganban_insert(string sn, string state)
        private string ganban_insert(string sn, string state, string finalQty = "0")
        {
            string result = "OK";
            string resultQty = "0";

            if (state.Equals("F"))
            {
                resultQty = finalQty.ToString().Replace(",", "");
                state = "R";
            }
            else if (state.Equals("R"))
            {
                resultQty = lblMakelotqty.Text.Replace(",", "");
            }
            else if (state.Equals("T"))
            {
                if (btnWorkType.Text == "ID/GANBAN SCAN(O)")
                {
                    resultQty = _gtQty.ToString();
                }
                else if (btnWorkType.Text == "Online(O)")
                {
                    resultQty = _gtQty.ToString();
                }
                else
                {
                    resultQty = (int.Parse(lblWOPlanQty.Text.Replace(",", "")) - int.Parse(lblWOProdQty.Text.Replace(",", ""))).ToString();
                }
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_enddate", "");
            paramsMap.Add("p_ctprintno", "");
            paramsMap.Add("p_pre_item_id", "");
            paramsMap.Add("p_serialnumber", sn);
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_work_order_id", btnPoSearch.Text);
            paramsMap.Add("p_wo_state", state);
            paramsMap.Add("p_shift_cd", clsStatic._SHIFT_ID);
            paramsMap.Add("p_work_person", clsStatic._PERSONCOUNT);
            paramsMap.Add("p_good_qty", resultQty);
            paramsMap.Add("p_bad_qty", "0");
            paramsMap.Add("p_description", "POP 실적");
            paramsMap.Add("p_close_flag", "N");
            paramsMap.Add("p_badcode", "NODATA");
            paramsMap.Add("p_destination", lblDestination.Text.Trim());
            paramsMap.Add("p_update_by", clsStatic._USER_ID);
            paramsMap.Add("p_work_day", _work_day);
            paramsMap.Add("p_starttime", _start_time);
            paramsMap.Add("p_labeltype", _ctLabeltype);
            paramsMap.Add("p_resource_cd", clsStatic._RESOURCE_CD);
            paramsMap.Add("p_equipment_cd", clsStatic._EQUIPMENT_CD);
            paramsMap.Add("p_inline_flag", inlineFlag);

            paramsList.Add(paramsMap);

            string retvalue = "";

            // 2019.08.27 김백건
            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopworesultnew_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "E")
            {
                toMessage(dt.Rows[0]["p_err_msg"].ToString());
                result = "NG";
            }

            return result;
        }

        private string ganban_insert2(string sn, string state, string qty, string finalQty = "0")
        {
            string result = "OK";
            string resultQty = "0";

            if (state.Equals("F"))
            {
                resultQty = finalQty.ToString().Replace(",", "");
                state = "R";
            }
            else if (state.Equals("R"))
            {
                resultQty = qty.Replace(",", "");
            }
            else if (state.Equals("T"))
            {
                if (btnWorkType.Text == "ID/GANBAN SCAN(O)")
                {
                    resultQty = _gtQty.ToString();
                }
                else if (btnWorkType.Text == "Online(O)")
                {
                    resultQty = _gtQty.ToString();
                }
                else
                {
                    resultQty = (int.Parse(lblWOPlanQty.Text.Replace(",", "")) - int.Parse(lblWOProdQty.Text.Replace(",", ""))).ToString();
                }
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_enddate", "");
            paramsMap.Add("p_ctprintno", "");
            paramsMap.Add("p_pre_item_id", "");
            paramsMap.Add("p_serialnumber", sn);
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_work_order_id", btnPoSearch.Text);
            paramsMap.Add("p_wo_state", state);
            paramsMap.Add("p_shift_cd", clsStatic._SHIFT_ID);
            paramsMap.Add("p_work_person", clsStatic._PERSONCOUNT);
            paramsMap.Add("p_good_qty", resultQty);
            paramsMap.Add("p_bad_qty", "0");
            paramsMap.Add("p_description", "POP 실적");
            paramsMap.Add("p_close_flag", "N");
            paramsMap.Add("p_badcode", "NODATA");
            paramsMap.Add("p_destination", lblDestination.Text.Trim());
            paramsMap.Add("p_update_by", clsStatic._USER_ID);
            paramsMap.Add("p_work_day", _work_day);
            paramsMap.Add("p_starttime", _start_time);
            paramsMap.Add("p_labeltype", _ctLabeltype);
            paramsMap.Add("p_resource_cd", clsStatic._RESOURCE_CD);
            paramsMap.Add("p_equipment_cd", clsStatic._EQUIPMENT_CD);
            paramsMap.Add("p_inline_flag", inlineFlag);

            paramsList.Add(paramsMap);

            string retvalue = "";

            // 2019.08.27 김백건
            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopworesultnew_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "E")
            {
                toMessage(dt.Rows[0]["p_err_msg"].ToString());
                result = "NG";
            }

            return result;
        }

        #endregion

        #region method : 실적등록 프로시저 priduct_insert_proc(string sn)
        private string priduct_insert_proc(string sn)
        {
            string result = "OK";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_SN", sn);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);
            paramsMap.Add("P_RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsList.Add(paramsMap);

            string retvalue = "";
            // 2019.08.27 김백건
            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ct_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "S")
            {
                firstSet = "NG";
                wo_search("NO", "Y");
            }
            else
            {
                result = "NG";
                frmWOMessage frm = new frmWOMessage(dt.Rows[0]["p_err_msg"].ToString(), 20);
                frm.ShowDialog();
                txtSN.Text = "";
                txtSN_Focus();
                return result;
            }

            return result;
        }
        #endregion

        #region method : 실적 등록 > 실적등록 프로시저 호출
        private void product_insert(string sn)
        {
            if (btnWorkType.Text.Equals("ID/GANBAN SCAN(O)") || btnWorkType.Text.Equals("Online(O)"))
            {
                priduct_insert_proc(sn);
            } else
            {
                int planQty = int.Parse(lblWOPlanQty.Text.ToString().Replace(",", ""));
                int prodQty = int.Parse(lblWOProdQty.Text.ToString().Replace(",", "")) + _gtQty + 1;

                if (planQty < prodQty)
                {
                    //frmMessage frm = new frmMessage("생산수량이 계획수량을 초과하였습니다. 초과 생산 하시겠습니까?", "OK_CANCEL");
                    frmMessage frm = new frmMessage("Prod Qty exceeded Plan Qty. Do you want to overproduce?", "OK_CANCEL");
                    DialogResult result2 = frm.ShowDialog();

                    if (result2 == DialogResult.OK)
                    {
                        btnWorkType.Text = btnWorkType.Text + "(O)";
                        priduct_insert_proc(sn);
                    }
                    else
                    {
                        //frmWOMessage frm2 = new frmWOMessage("작업지시서 종료를 위해 간판 스캔이 필요합니다.", 2);
                        frmWOMessage frm2 = new frmWOMessage("GANBAN scan required for WORKORDER complete.", 2);
                        frm2.ShowDialog();
                    }
                } else
                {
                    priduct_insert_proc(sn);
                }
            }
        }
        #endregion

        #region method : 작업지시서 조회
        private string wo_search(string destinationFlag, string flag = "N")
        {
            string result = "OK";
            // 작업일이 설정 되지 않은 경우 sheft 판단
            if (_work_day == "")
            {
                today_info_load();
                result_info_load();

                if (_work_day == "" && _start_time == "")
                {
                    result = "NG";
                    //frmWOMessage frm = new frmWOMessage("설비 Schedule 정보가 없습니다.", 2);
                    frmWOMessage frm = new frmWOMessage("There is no facility schedule information.", 2);
                    frm.ShowDialog();
                    init_process();
                    return result;
                }
            }

            #region 작업지시서 정보 조회
            // 작업지시서 정보 호출 parameter 설정
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsMap1.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
            paramsMap1.Add("EQUIPMENT_CD", clsStatic._EQUIPMENT_CD);
            paramsMap1.Add("PLAN_DATE", _work_day);

            paramsList1.Add(paramsMap1);

            _gtType = "";
            string retvalue = "";

            _woDt.Dispose();
            _woDt = new DataTable();
            _woDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_polandpopwo.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (_woDt == null)
            {
                result = "NG";
                //frmWOMessage frm = new frmWOMessage("작업지시서 조회 결과가 없습니다.", 2);
                frmWOMessage frm = new frmWOMessage("There is no WORKORDER query result.", 2);
                frm.ShowDialog();
                init_process();
                return result;
            }

            if (_woDt.Rows.Count == 0)
            {
                result = "NG";
                //frmWOMessage frm = new frmWOMessage("작업지시서 조회 결과가 없습니다.", 2);
                frmWOMessage frm = new frmWOMessage("There is no WORKORDER query result.", 2);
                frm.ShowDialog();
                init_process();
                return result;
            }

            if (int.Parse(_woDt.Rows[0]["RUNCNT"].ToString()) > 0)
            {
                result = "NG";
                //frmWOMessage frm = new frmWOMessage("진행중인 작업지시서가 존재합니다.", 2);
                frmWOMessage frm = new frmWOMessage("There is a WORKORDER in running.", 2);
                frm.ShowDialog();
                init_process();
                return result;
            }

            //if(_woDt.Rows[0]["WOSTATE"].ToString().Trim() == "A" && _woDt.Rows[0]["POPINPUTTYPE"].ToString().Trim() == "BUTTON")
            if (_woDt.Rows[0]["WOSTATE"].ToString().Trim() == "A")
            {
                //wo_start();
            }

            if (firstSet == "OK")
            {
                // GT 라벨 ID 및 GT 라벨 타입
                _gtType = _woDt.Rows[0]["POPGTLABELID"].ToString();
                _gtLabelType = _woDt.Rows[0]["POPGTLABELTYPE"].ToString();
                // CT 라벨 ID 및 CT 라벨 타입
                _ctType = _woDt.Rows[0]["POPCTLABELID"].ToString();
                _ctLabelType = _woDt.Rows[0]["POPCTLABELTYPE"].ToString();
                
                // PALLET 라벨 ID 및 PALLET 라벨 타입
                _palletType = _woDt.Rows[0]["POPPALLETLABELID"].ToString();
                _palletLabelType = _woDt.Rows[0]["POPPALLETLABELTYPE"].ToString();

                // 작업지시서 ID
                btnPoSearch.Text = _woDt.Rows[0]["WORKORDERID"].ToString();

                // 품목 ID 및 품목명
                lblItem.Text = _woDt.Rows[0]["ITEMID"].ToString();
                lblItemdesc.Text = _woDt.Rows[0]["ITEMNAME"].ToString();
                // 품목 DESC 및 품목 SPEC
                _labeldesc = _woDt.Rows[0]["LABELDESC"].ToString();
                _labelspec = _woDt.Rows[0]["LABELSPEC"].ToString();

                // 계획 수량
                lblWOPlanQty.Text = _woDt.Rows[0]["CONFIRMQTY"].ToString();
                // 현재 라인 금일 계획 수량
                lblDayPlanQty.Text = _woDt.Rows[0]["TODAYPLAN"].ToString();

                _lotType = _woDt.Rows[0]["POPINPUTTYPE"].ToString();

                if (_ctLabelType == "ROLL" && _lotType == "SN")
                {
                    btnLEDLot.Enabled = true;
                    btnPressLot.Enabled = true;
                }
                else
                {
                    btnLEDLot.Text = "";
                    btnLEDLot.Enabled = false;
                    btnPressLot.Text = "";
                    btnPressLot.Enabled = false;
                }

                //화면 타이틀 설정
                string buf = clsStatic._RESOURCE_TEXT + "(" + clsStatic._RESOURCE_CD + ")";
                if (buf != btnTitle.Text)
                {
                    btnTitle.Text = buf;
                }
            }
            
            
            if (firstSet == "OK")
            {
                if (_woDt.Rows[0]["POPMAKELOTQTY"].ToString() == "")
                {
                    lblMakelotqty.Text = "0";
                } else
                {
                    lblMakelotqty.Text = _woDt.Rows[0]["POPMAKELOTQTY"].ToString();
                }
                
            }

            //// 장입수량
            //if (lblMakelotqty.Text.Equals("0"))
            //{
            //    lblMakelotqty.Text = _woDt.Rows[0]["POPMAKELOTQTY"].ToString();
            //} else
            //{
            //    if(!btnWorkType.Text.Contains("Online"))
            //    {
            //        lblMakelotqty.Text = _woDt.Rows[0]["POPMAKELOTQTY"].ToString();
            //    }
            //}

            // CT QTY
            if (_woDt.Rows[0]["POPCTQTY"].ToString() == "")
            {
                _ctQty = 0;
            } else
            {
                _ctQty = int.Parse(_woDt.Rows[0]["POPCTQTY"].ToString());
            }
            

            
            // 실적 수량
            lblWOProdQty.Text = _woDt.Rows[0]["QTY"].ToString();
            // 불량 수량
            lblWONGQty.Text = _woDt.Rows[0]["BADQTY"].ToString();
            
            // 현재 라인 금일 실적 수량
            lblDayProdQty.Text = _woDt.Rows[0]["TODAYGOODQTY"].ToString();
            // 현재 라인 금일 불량 수량
            lblDayNGQty.Text = _woDt.Rows[0]["TODAYBADQTY"].ToString();

            // 작업지시서 상태 >> A(대기), H(중지), R(진행\), C(취소), T(종료)
            _wostate = _woDt.Rows[0]["WOSTATE"].ToString();
            
            // 작업 인원
            btnPerson.Text = "Person(" + clsStatic._PERSONCOUNT + "명)";

            // 향지 설정 flag
            if (destinationFlag == "OK")
            {
                // 향지
                lblDestination.Text = _woDt.Rows[0]["DESTINATION"].ToString();
            }
            
            // 작업지시서 상태에 따른 작업지시서 상태 버튼 명 변경
            // 준비
            //if (_wostate == "A")
            //{
            //    btnHalt.Text = "Order Stanby";
            //}
            //// 홀딩
            //else if (_wostate == "H")
            //{
            //    btnHalt.Text = "Order Halt";
            //}
            ////진행
            //else if (_wostate == "R")
            //{
            //    btnHalt.Text = "Order Running";
            //}
            ////취소
            //else if (_wostate == "C")
            //{
            //    btnHalt.Text = "Order Cancel";
            //}
            ////완료
            //else if (_wostate == "T")
            //{
            //    btnHalt.Text = "Order Complete";
            //}

            // 제품타입에 따른 분류
            if (_lotType == "BUTTON")
            {
                // _lotType : BUTTON // _ctLAbelType : 무관
                // 공정제품 >> 제품라벨이 존재하지 않고, 공정라벨으로 실적 처리한다.
                txtSN.Enabled = true;
                txtSN.BackColor = Color.Yellow;
                if (flag == "N")
                {
                    btnWorkType.Text = "GANBAN SCAN";
                }
            }
            else if (_lotType == "SN")
            {
                if (_ctLabelType == "ROLL")
                {
                    // _lotType : SN // _ctLAbelType : ROLL
                    // 제품 >> 제품라벨이 존재하며, 간판라벨을 Online 발행한다.
                    // 제품라벨만 스캔 가능
                    // 제품라벨 스캔시 실적처리는 되지않으며, 간판라벨이 발행되면 실적이 처리된다.
                    txtSN.Enabled = true;
                    txtSN.BackColor = Color.Yellow;
                    if (flag == "N")
                    {
                        btnWorkType.Text = "Online";
                    }
                }
                else if (_ctLabelType == "A4")
                {
                    // _lotType : SN // _ctLAbelType : A4
                    // 제품 >> 제품라벨이 존재하며, 간판라벨을 선발행한다.
                    // 제품라벨 / 간판라벨 병행 스캔 가능
                    // 제품라벨 스캔시 실적처리는 되지않으며, 간판라벨이 스캔되면 실적이 처리된다.
                    txtSN.Enabled = true;
                    txtSN.BackColor = Color.Yellow;
                    if (flag == "N")
                    {
                        btnWorkType.Text = "ID/GANBAN SCAN";
                    }
                }
                else
                {
                    // 에외 Case : 제품의 라벨디자인 타입을 확인하세요.(ROLL OR A4)
                    // 화면 초기화
                    result = "NG";
                    //frmWOMessage frm = new frmWOMessage("제품 라벨 디자인 타입을 확인하세요.(ROLL or A4)", 2);
                    frmWOMessage frm = new frmWOMessage("Check the product label design type.(ROLL or A4)", 2);
                    frm.ShowDialog();
                    txtSN.Enabled = true;
                    txtSN.BackColor = Color.Yellow;
                    init_process();
                    return result;
                }
            } else
            {
                // 에외 Case : 제품의 제품타입을 확인하세요.(BUTTON OR SN)
                // 화면 초기화
                result = "NG";
                //frmWOMessage frm = new frmWOMessage("제품 타입을 확인하세요.(BUTTON or SN)", 2);
                frmWOMessage frm = new frmWOMessage("Check the product type.(BUTTON or SN)", 2);
                frm.ShowDialog();
                txtSN.Enabled = true;
                txtSN.BackColor = Color.Yellow;
                init_process();
                return result;
            }
            #endregion

            //#region netting 되지 않은 제품 리스트 조회
            //List<Dictionary<string, object>> paramsList2 = new List<Dictionary<string, object>>();
            //Dictionary<string, object> paramsMap2 = new Dictionary<string, object>();
            //paramsMap2.Add("p_err_code", "");
            //paramsMap2.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            //paramsMap2.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            //paramsMap2.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);
            //paramsMap2.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
            //paramsMap2.Add("CT", "NODATA");
            //paramsList2.Add(paramsMap2);
            //DataTable packDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_polandpopgt_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);
            //grdPackList.DataBindDataSource(packDt, false, false);
            //#endregion

            #region 스캔된 제품 리스트 조회
            List<Dictionary<string, object>> paramsList3 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap3 = new Dictionary<string, object>();
            paramsMap3.Add("p_err_code", "");
            paramsMap3.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap3.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap3.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsMap3.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
            paramsMap3.Add("CT", "");
            paramsList3.Add(paramsMap3);
            DataTable allDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_polandpopgt_list.dummy", paramsList3, clsStatic._serviceSelectURL, ref retvalue);
            grdAllList.DataBindDataSource(allDt, false, false);
            #endregion

            DataTable packDt = allDt.Clone();
            
            if (allDt.Rows.Count > 0)
            {
                DataRow[] packdtrow = allDt.Select("CT='NODATA'");
                packDt.Clear();
                foreach (DataRow newRow in packdtrow)
                {
                    packDt.ImportRow(newRow);
                }
                grdPackList.DataBindDataSource(packDt, false, false);
            }

            

            // netting 되지 않은 제품 수량
            _gtQty = 0;
            for (int i = 0; i < grdPackList.Rows.Count; i++)
            {
                int qty = int.Parse(grdPackList.Rows[i].Cells["QTY"].Value.ToString());

                _gtQty += qty;
            }

            if (int.Parse(lblWOPlanQty.Text.Replace(",", "")) < int.Parse(lblWOProdQty.Text.Replace(",", "")) + _gtQty)
            {
                if (!btnWorkType.Text.ToString().Contains("(O)"))
                {
                    btnWorkType.Text = btnWorkType.Text + "(O)";
                }
            }

            lblBoxCount.Text = _gtQty + "EA";
            lblGanbanQty.Text = (_gtQty + int.Parse(_woDt.Rows[0]["QTY"].ToString())) + "EA";

            return result;
        }
        #endregion

        #region method : sheft 관련 날짜 설정
        private void today_info_load()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_getstarttime_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            DateTime sysDate;
            DateTime startDate;
            DateTime endDate;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                sysDate = DateTime.Parse(dt.Rows[i]["NOWDATE"].ToString());
                startDate = DateTime.Parse(dt.Rows[i]["STARTTIME"].ToString());
                endDate = DateTime.Parse(dt.Rows[i]["ENDTIME"].ToString());

                if (sysDate >= startDate && sysDate < endDate)
                {
                    _work_day = dt.Rows[i]["APPLYDATE"].ToString();
                    _start_time = dt.Rows[i]["STARTTIME"].ToString();
                    clsStatic._SHIFT_ID = dt.Rows[i]["SHIFTCD"].ToString();
                    break;
                }

                // 시간구간내 존재하지 않을 경우 강제로 해당 일자 정보 삽입
                if (i == dt.Rows.Count - 1)
                {
                    _work_day = dt.Rows[i]["APPLYDATE"].ToString();
                    _start_time = dt.Rows[i]["STARTTIME"].ToString();
                    clsStatic._SHIFT_ID = dt.Rows[i]["SHIFTCD"].ToString();
                }
            }
        }

        private void result_info_load()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsMap.Add("WORK_DAY", _work_day);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_getresultendtime_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt.Rows[0]["WORKDAY"].ToString() != "NODATA")
            {
                _work_day = dt.Rows[0]["WORKDAY"].ToString();
            }
            if (dt.Rows[0]["STARTTIME"].ToString() != "NODATA")
            {
                _start_time = dt.Rows[0]["STARTTIME"].ToString();
            }
        }
        #endregion

        #region method : scan 한 라벨의 작지 상태와 이전 작지의 상태 비교
        private string sntowo()
        {
            string retbuf = "OK";
            sntowo_nonworkcnt = 0;
            sntowo_workorderid = "";
            sntowo_labeltype = "";
            sntowo_itemid = "";
            sntowo_wostate = "";
            sntowo_sn = "";
            sntowo_oriqty = 0;
            sntowo_popganbanqty = 0;
            sntowo_nonctqty = 0;
            sntowo_wogoodqty = 0;
            sntowo_scanqty = 0;

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("SN", txtSN.Text.Trim());
            paramsMap1.Add("RESOURCE_CD", "");
            paramsMap1.Add("EQUIPMENT_CD", "");


            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_sntowo_list.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (dt == null || dt.Rows.Count == 0)
            {
                frmWOMessage frm = new frmWOMessage("Please scan the correct label.", 2);
                frm.ShowDialog();
                retbuf = "NG";
                return retbuf;

            }

            if (clsStatic._RESOURCE_CD != dt.Rows[0]["RESOURCECD"].ToString())
            {
                string sn = txtSN.Text;
                init_process();
                clsStatic._RESOURCE_CD = dt.Rows[0]["RESOURCECD"].ToString();
                clsStatic._RESOURCE_TEXT = dt.Rows[0]["RESOURCENAME"].ToString();
                clsStatic._EQUIPMENT_CD = dt.Rows[0]["EQUIPMENTCD"].ToString();
                clsStatic._EQUIPMENT_NAME = dt.Rows[0]["EQUIPMENTNAME"].ToString();
                clsStatic._EQUIPMENT_NUM = dt.Rows[0]["EQUIPMENTNUM"].ToString();
                label12.Text = clsStatic._EQUIPMENT_CD;
                txtSN.Text = sn;
            }

            if (int.Parse(dt.Rows[0]["NONWORKCNT"].ToString()) > 0)
            {
                sntowo_nonworkcnt = int.Parse(dt.Rows[0]["NONWORKCNT"].ToString());
                retbuf = "NG";
                return retbuf;
            }

            sntowo_workorderid  = dt.Rows[0]["WORKORDERID"].ToString();
            sntowo_labeltype    = dt.Rows[0]["LABELTYPE"].ToString();
            sntowo_itemid       = dt.Rows[0]["ITEMID"].ToString();
            sntowo_wostate      = dt.Rows[0]["WOSTATE"].ToString();
            sntowo_sn           = dt.Rows[0]["SN"].ToString();
            sntowo_oriqty       = int.Parse(dt.Rows[0]["ORIQTY"].ToString());
            sntowo_popganbanqty = int.Parse(dt.Rows[0]["POPGANBANQTY"].ToString());
            sntowo_nonctqty     = int.Parse(dt.Rows[0]["NONCTQTY"].ToString());
            sntowo_wogoodqty    = int.Parse(dt.Rows[0]["GANBANGOODQTY"].ToString());
            sntowo_scanqty      = int.Parse(dt.Rows[0]["SCANQTY"].ToString());

            string wo = dt.Rows[0]["WORKORDERID"].ToString();
            string itemid = dt.Rows[0]["ITEMID"].ToString();
            string wostate = dt.Rows[0]["WOSTATE"].ToString();
            string labelType = dt.Rows[0]["LABELTYPE"].ToString();
            string qty = dt.Rows[0]["ORIQTY"].ToString();
            string scanQty = dt.Rows[0]["SCANQTY"].ToString();

            // 기존 작지 존재
            if (lblItem.Text != "")
            {
                // 기존 진행 작지와 동일
                if (wo == btnPoSearch.Text)
                {
                    clsStatic._WORK_ORDER_ID = dt.Rows[0]["WORKORDERID"].ToString();
                    if (btnWorkType.Text.Equals("GANBAN SCAN") || btnWorkType.Text.Equals("GANBAN SCAN(O)"))
                    {
                        lblMakelotqty.Text = qty;
                    }
                    else if (btnWorkType.Text.Equals("ID/GANBAN SCAN") || btnWorkType.Text.Equals("ID/GANBAN SCAN(O)"))
                    {
                        if (labelType.Equals("GANBAN"))
                        {
                            lblMakelotqty.Text = qty;
                        }
                    }
                    return retbuf;
                }
                // 작지 변경
                else
                {
                    // 조회 작지에 대한 처리
                    if (wo != "NODATA")
                    {
                        
                        if (_wostate.Equals("T") || _wostate.Equals("H") || _wostate.Equals("A"))
                        {
                            clsStatic._WORK_ORDER_ID = dt.Rows[0]["WORKORDERID"].ToString();
                            firstSet = "OK";
                            string re = wo_search("OK");
                            if (re != "OK")
                            {
                                retbuf = "NG";
                                return retbuf;
                            }

                            getBadgrid();
                            getganbanGrid();
                            firstSet = "NG";
                            if (btnWorkType.Text.Equals("GANBAN SCAN") || btnWorkType.Text.Equals("GANBAN SCAN(O)"))
                            {
                                lblMakelotqty.Text = qty;
                            }
                            else if (btnWorkType.Text.Equals("ID/GANBAN SCAN") || btnWorkType.Text.Equals("ID/GANBAN SCAN(O)"))
                            {
                                if (labelType.Equals("GANBAN"))
                                {
                                    lblMakelotqty.Text = qty;
                                }
                            }
                            return retbuf;
                        } else
                        {
                            //frmWOMessage frm = new frmWOMessage("해당 작업지시를 완료 시킨 후 작업을 진행하세요!", 10);
                            frmWOMessage frm = new frmWOMessage("Proceed with the work after completing the WORKORDER!", 10);
                            frm.ShowDialog();
                            retbuf = "NG";
                            txtSN.Text = "";
                            txtSN_Focus();
                            return retbuf;
                        }
                    }
                    // 조회 작지가 미존재 처리
                    else
                    {
                        //frmWOMessage frm = new frmWOMessage("정확한 라벨을 스캔하여 주세요.", 2);
                        frmWOMessage frm = new frmWOMessage("Please scan the correct label.", 2);
                        frm.ShowDialog();
                        retbuf = "NG";
                        txtSN.Text = "";
                        txtSN_Focus();
                        return retbuf;
                    }
                }
            }
            // 기존 작지 미존재
            else
            {
                // 조회 작지에 대한 처리
                if (wo != "NODATA")
                {
                    clsStatic._WORK_ORDER_ID = dt.Rows[0]["WORKORDERID"].ToString();
                    firstSet = "OK";
                    string re = wo_search("OK");
                    if (re != "OK")
                    {
                        retbuf = "NG";
                        return retbuf;
                    }
                    getBadgrid();
                    getganbanGrid();
                    firstSet = "NG";
                    if (btnWorkType.Text.Equals("GANBAN SCAN") || btnWorkType.Text.Equals("GANBAN SCAN(O)"))
                    {
                        lblMakelotqty.Text = qty;
                    }
                    else if (btnWorkType.Text.Equals("ID/GANBAN SCAN") || btnWorkType.Text.Equals("ID/GANBAN SCAN(O)"))
                    {
                        if (labelType.Equals("GANBAN"))
                        {
                            lblMakelotqty.Text = qty;
                        }
                    }
                    return retbuf;
                }
                // 조회 작지가 미존재 처리
                else
                {
                    //frmWOMessage frm = new frmWOMessage("정확한 라벨을 스캔하여 주세요.", 2);
                    frmWOMessage frm = new frmWOMessage("Please scan the correct label", 2);
                    frm.ShowDialog();
                    retbuf = "NG";
                    txtSN.Text = "";
                    txtSN_Focus();
                    return retbuf;
                }
            }
        }
        #endregion

        #region method : 작업지시서 시작(미사용)
        private void wo_start()
        {
            string work_order_id = _woDt.Rows[0]["WORKORDERID"].ToString().Trim();

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_serialnumber", "LOTSTART");
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_work_order_id", work_order_id);
            paramsMap.Add("p_wo_state", "R");
            paramsMap.Add("p_shift_cd", "DAY");
            paramsMap.Add("p_work_person", clsStatic._PERSONCOUNT);
            paramsMap.Add("p_good_qty", "0");
            paramsMap.Add("p_bad_qty", "0");
            paramsMap.Add("p_description", "작업지시 시작");
            paramsMap.Add("p_close_flag", "N");
            paramsMap.Add("p_badcode", "NODATA");
            paramsMap.Add("p_update_by", clsStatic._USER_ID);

            paramsList.Add(paramsMap);

            string retvalue = "";
            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popworesult_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }
        #endregion

        #region method : scan 창 아래 메세지 출력창 메세지 등록
        private void toMessage(string message)
        {
            lblMessage.Text = message;
            timerMessage.Enabled = true;
        }
        #endregion

        #region method : scan ID 수량과 scan 간판 수량 비교
        private string getNonCtQty()
        {
            string result = "NG";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ChkWorkOrderState.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            string nonCtQty = "";

            if (dt.Rows.Count > 0)
            {
                nonCtQty = dt.Rows[0]["NONCTQTY"].ToString();
            }
            else
            {
                result = "NG";
            }

            return result;
        }
        #endregion

        #region method : Online 제품에 대해 간판라벨 생성
        private string setOnlinGanban(string workOrderID, int _ctQty)
        {
            string result = "NG";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ctnumber", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_WORK_ORDER_ID", workOrderID);
            paramsMap.Add("P_GANBANQTY", _ctQty.ToString());
            paramsMap.Add("P_RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.set_onlineGanban_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows.Count == 0)
            {
                result = "NG";
            }

            if (dt.Rows[0]["p_err_code"].ToString() == "OK")
            {
                result = dt.Rows[0]["p_ctnumber"].ToString();
            } else
            {
                result = "NG";
            }

            return result;
        }
        #endregion

        #region method : 비가동 코드 리스트 조회
        private void now_nonwork_load(string initFlag)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsMap.Add("EQUIPMENT_CD", clsStatic._EQUIPMENT_CD);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_nonwork.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt.Rows.Count > 0)
            {
                string workdate = dt.Rows[0]["WORKDATE"].ToString();
                string nonclassid = dt.Rows[0]["NONCLASSID"].ToString();
                string nonwolrkcd = dt.Rows[0]["NONWORKCD"].ToString();
                string nontype = dt.Rows[0]["NONTYPE"].ToString();
                string nontypename = dt.Rows[0]["NONTYPENAME"].ToString();
                string losstime = dt.Rows[0]["LOSSTIME"].ToString();

                frmNonProdTime frm = new frmNonProdTime(nontypename, workdate, nonclassid, nonwolrkcd, nontype, losstime);
                frm.ShowDialog();
            }
            else if (initFlag != "INIT")
            {
                if (_work_day == "")
                {
                    today_info_load();
                    result_info_load();
                }

                frmNonProd frm = new frmNonProd(_work_day);
                frm.ShowDialog();
            }

        }
        #endregion

        #region method : 불량 코드 Check
        private DataRow[] getbadnoncode(string value)
        {
            DataRow[] retbuf = null;
            DataRow[] drs = clsStatic._badnonDt.Select("CODEID = '" + value + "'");

            if (drs.Length > 0)
            {
                if (drs[0]["CODETYPE"].ToString().Trim() == "BADCODE" && btnPoSearch.Text == "Select")
                {
                    //frmWOMessage frm = new frmWOMessage("스캔한 내용은 불량코드입니다! 작업지시를 먼저 선택하여 주세요!", 0);
                    frmWOMessage frm = new frmWOMessage("Scanned content is bad code. Please select a WORKORDER first!", 0);
                    frm.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return null;
                }

                retbuf = drs;
            }

            return retbuf;
        }
        #endregion

        #region method : CT Packing (미사용)
        private void sn_ct_packing()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ct", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);



            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popctpacking_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "OK")
            {
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", dt.Rows[0]["p_ct"].ToString(), "", 0, 0, "", ref _BasicDs);
            }
            wo_search("NO");

        }
        #endregion

        #region method : 키패드 호출
        private void keypadEvent(Label keypadLabel)
        {

            if (keypadLabel.Text == "")
            {
                keypadLabel.Text = "0";
                //frmMessage frm1 = new frmMessage("간판 라벨 조회 후 입력 하세요.", "AUTOCLOSE");
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

            frmLoginIDInsert frm = new frmLoginIDInsert(keypadLabel.Text.Trim().Replace(",", ""));
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                keypadLabel.Text = int.Parse(clsStatic._dialogValue).ToString();
                clsStatic._dialogValue = "";
            }
        }
        #endregion

        #region event : Online 라벨 발행
        private void lblOnlinePrint_Click(object sender, EventArgs e)
        {
            if (btnPoSearch.Text == "Select")
            {
                return;
            }

            string ganbanId = "";
            if (btnWorkType.Text.Equals("Online"))
            {
                if (_ctType.Equals("DG-B02"))
                {
                    if (btnPressLot.Text.Equals(""))
                    {
                        //frmWOMessage frm1 = new frmWOMessage("Press No. 를 확인 해 주세요", 2);
                        frmWOMessage frm1 = new frmWOMessage("Press No. Please check.", 2);
                        frm1.ShowDialog();
                        txtSN.Text = "";
                        txtSN_Focus();
                        return;
                    }
                } else if (_ctType.Equals("DG-B01"))
                {
                    if (btnPressLot.Text.Equals("") || btnLEDLot.Text.Equals(""))
                    {
                        //frmWOMessage frm1 = new frmWOMessage("LED Lot No. / Press No. 를 확인 해 주세요", 2);
                        frmWOMessage frm1 = new frmWOMessage("LED Lot No. / Press No. Please check.", 2);
                        frm1.ShowDialog();
                        txtSN.Text = "";
                        txtSN_Focus();
                        return;
                    }
                }

                if (int.Parse(lblMakelotqty.Text.Replace(",", "")) <= _gtQty)
                {
                    ganbanId = online_ganban_insert(int.Parse(lblMakelotqty.Text.Replace(",", "")));
                    ganban_insert2(ganbanId, "R", lblMakelotqty.Text);
                    clsLabelSet.label_print2(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", ganbanId, "", 0, 0, btnLEDLot.Text, btnPressLot.Text, "", ref _BasicDs);
                }
                else
                {
                    //frmWOMessage frm1 = new frmWOMessage("제품 스캔 수량이 간판수량보다 작습니다.", 2);
                    frmWOMessage frm1 = new frmWOMessage("Scanned Qty is less than Qty of GANBAN label.", 2);
                    frm1.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }
            }
            else if (btnWorkType.Text.Equals("Online(O)"))
            {
                if (_ctType.Equals("DG-B02"))
                {
                    if (btnPressLot.Text.Equals(""))
                    {
                        //frmWOMessage frm1 = new frmWOMessage("Press No. 를 확인 해 주세요", 2);
                        frmWOMessage frm1 = new frmWOMessage("Press No. Please check.", 2);
                        frm1.ShowDialog();
                        txtSN.Text = "";
                        txtSN_Focus();
                        return;
                    }
                }
                else if (_ctType.Equals("DG-B01"))
                {
                    if (btnPressLot.Text.Equals("") || btnLEDLot.Text.Equals(""))
                    {
                        //frmWOMessage frm1 = new frmWOMessage("LED Lot No. / Press No. 를 확인 해 주세요", 2);
                        frmWOMessage frm1 = new frmWOMessage("LED Lot No. / Press No. Please check.", 2);
                        frm1.ShowDialog();
                        txtSN.Text = "";
                        txtSN_Focus();
                        return;
                    }
                }

                if (int.Parse(lblMakelotqty.Text.Replace(",", "")) > _gtQty)
                {
                    clsStatic._dialogValue = "";
                    //frmWOMessage frm1 = new frmWOMessage("작업지시서를 종료 하시겠습니까?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                    frmWOMessage frm1 = new frmWOMessage("Do you want to Complete the work order?", "", "", "Complete", "Cancel", "", "T", "Cancel");
                    frm1.ShowDialog();

                    if (clsStatic._dialogValue.Equals("T"))
                    {
                        ganbanId = online_ganban_insert(_gtQty);
                        ganban_insert2(ganbanId, "T", lblMakelotqty.Text);
                        clsLabelSet.label_print2(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", ganbanId, "", 0, 0, btnLEDLot.Text, btnPressLot.Text, "", ref _BasicDs);
                        clsStatic._dialogValue = "";
                        init_process();
                        return;
                    }
                }
                else
                {
                    ganbanId = online_ganban_insert(int.Parse(lblMakelotqty.Text.Replace(",", "")));
                    ganban_insert2(ganbanId, "R", lblMakelotqty.Text);
                    clsLabelSet.label_print2(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", ganbanId, "", 0, 0, btnLEDLot.Text, btnPressLot.Text, "", ref _BasicDs);
                }
            }
            else
            {
                //frmWOMessage frm1 = new frmWOMessage("Online 발행 제품만 가능합니다.", 2);
                frmWOMessage frm1 = new frmWOMessage("Only Online type products are available.", 2);
                frm1.ShowDialog();
                txtSN.Text = "";
                txtSN_Focus();
                return;
            }

            wo_search("OK");
            getganbanGrid();
            txtSN.Text = "";
            txtSN_Focus();

        }
        #endregion

        private string online_ganban_insert(int qty)
        {
            string result = "NG";

            int ganbanqty = qty;


            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ctnumber", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
            paramsMap.Add("P_GANBANQTY", ganbanqty);
            paramsMap.Add("P_RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);
            paramsList.Add(paramsMap);

            string retvalue = "";
            // 2019.08.27 김백건
            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.set_onlineGanban_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "S")
            {
                result = dt.Rows[0]["p_ctnumber"].ToString();
            }
            else
            {
                result = "NG";
                frmWOMessage frm = new frmWOMessage(dt.Rows[0]["p_err_msg"].ToString(), 20);
                frm.ShowDialog();
                txtSN.Text = "";
                txtSN_Focus();
                return result;
            }

            return result;
        }


        private string ganban_cancel(string sn)
        {
            string result = "NG";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_enddate", "");
            paramsMap.Add("p_serialnumber", sn);
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_work_order_id", btnPoSearch.Text);
            paramsMap.Add("p_update_by", clsStatic._USER_ID);
            
            paramsList.Add(paramsMap);

            string retvalue = "";

            // 2019.08.27 김백건
            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.cancel_polandpopworesultnew_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "NG")
            {
                toMessage(dt.Rows[0]["p_err_msg"].ToString());
                result = "NG";
            }

            return result;
        }

        private void btnPressLot_Click(object sender, EventArgs e)
        {
            if (_ctLabelType == "ROLL" && _lotType == "SN")
            {
                clsStatic._dialogValue = "";

                frmLEDLot frm = new frmLEDLot(_ctType);
                frm.ShowDialog();

                if (clsStatic._dialogValue != "")
                {
                    string value = clsStatic._dialogValue;
                    string[] result = value.Split(new char[] { '/' });

                    btnLEDLot.Text = result[0];
                    btnPressLot.Text = result[1];

                    clsStatic._dialogValue = "";
                }
            }
        }

        private void getBadgrid()
        {
            string retvalue = "";
            #region 불량 리스트 조회
            List<Dictionary<string, object>> paramsList5 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap5 = new Dictionary<string, object>();
            paramsMap5.Add("p_err_code", "");
            paramsMap5.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap5.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap5.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
            paramsList5.Add(paramsMap5);
            DataTable badDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popbadprod_list.dummy", paramsList5, clsStatic._serviceSelectURL, ref retvalue);
            grdBad.DataBindDataSource(badDt, false, false);
            #endregion
        }

        private void getganbanGrid()
        {
            string retvalue = "";
            #region 스캔된 간판 리스트 조회
            List<Dictionary<string, object>> paramsList4 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap4 = new Dictionary<string, object>();
            paramsMap4.Add("p_err_code", "");
            paramsMap4.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap4.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap4.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
            paramsList4.Add(paramsMap4);
            DataTable ganbanDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_polandpopganban_list.dummy", paramsList4, clsStatic._serviceSelectURL, ref retvalue);
            grdGanbanList.DataBindDataSource(ganbanDt, false, false);
            #endregion

            // 스캔된 간판 수량의 총계 (현재 반영된 실적 수량)
            int ganbanSum = 0;
            for (int i = 0; i < ganbanDt.Rows.Count; i++)
            {
                ganbanSum += int.Parse(ganbanDt.Rows[i]["GOODQTY"].ToString().Trim());
            }
            lblGanbanQty.Text = String.Format("{0:###0}", ganbanSum);
        }

        private string chkganban ()
        {
            string result = "OK";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("SN", txtSN.Text.Trim());

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganban_chk.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt == null || dt.Rows.Count == 0)
            {
                frmWOMessage frm = new frmWOMessage("Please scan the correct label.", 2);
                frm.ShowDialog();
                result = "NG";
            }

            if (!dt.Rows[0]["WORKORDERID"].ToString().Equals(btnPoSearch.Text))
            {
                frmWOMessage frm = new frmWOMessage("The scanned GANBAN Label has a different WORKORDER.", 2);
                frm.ShowDialog();
                result = "NG";
            }

            if (int.Parse(dt.Rows[0]["GOODQTY"].ToString()) > 0 || dt.Rows[0]["INSUSEYN"].ToString().Equals("Y"))
            {
                frmWOMessage frm = new frmWOMessage("GANBAN Label is already used.", 2);
                frm.ShowDialog();
                result = "NG";
            }

            return result;
        }

        //투입화면으로 이동
        private void btnMoveInput_Click(object sender, EventArgs e)
        {
            if(btnPoSearch.Text == "Select")
            {
                //"작업지시를 먼저 선택하여 주세요!;
                frmMessage frm1 = new frmMessage("Please select WORKORDER first.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string tmpRes = clsStatic._RESOURCE_CD;
            string tmpResTxt = clsStatic._RESOURCE_TEXT;
            string tmpWo = clsStatic._WORK_ORDER_ID;

            //clsStatic._RESOURCE_CD = "";
            clsStatic._WORK_ORDER_ID = "";
            clsStatic._USEMANAGEMENT = "STOCK";

            frmWMSProcess frm = new frmWMSProcess("Mat. Input", btnPoSearch.Text);
            frm.ShowDialog();

            clsStatic._RESOURCE_CD = tmpRes;
            clsStatic._RESOURCE_TEXT = tmpResTxt;
            clsStatic._WORK_ORDER_ID = tmpWo;
            clsStatic._USEMANAGEMENT = "PRODUCT_COMPLETE";
        }

        private void label12_Click(object sender, EventArgs e)
        {
            if (int.Parse(clsStatic._EQUIPMENT_NUM) > 0)
            {
                clsStatic._resouceType = "EQUIPMENT";
                clsStatic._dialogValue = "";
                frmCommonSelect frm = new frmCommonSelect("EQUIPMENT");
                frm.ShowDialog();

                if (clsStatic._dialogValue != "")
                {
                    label12.Text = clsStatic._dialogValue;
                }

                clsStatic._resouceType = "";
                clsStatic._dialogValue = "";
            }
        }

        private void initEquipmentnum()
        {
            if (clsStatic._EQUIPMENT_NUM.Equals(""))
            {
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);

                paramsList.Add(paramsMap);

                string retvalue = "";

                DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_equipment_num.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

                if (dt == null || dt.Rows.Count == 0)
                {
                    clsStatic._EQUIPMENT_NUM = "1";
                } else
                {
                    clsStatic._EQUIPMENT_NUM = dt.Rows[0]["EQUIPMENTNUM"].ToString();
                }
            }
        }

        private void label10_Click(object sender, EventArgs e)
        {
            if (label10.Text.Equals("Inline-N"))
            {
                label10.BackColor = Color.Red;
                label10.Text = "Inline-Y";
                inlineFlag = "Y";
            } else
            {
                label10.BackColor = Color.Black;
                label10.Text = "Inline-N";
                inlineFlag = "N";
            }
        }
    }
}
