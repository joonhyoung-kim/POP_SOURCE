using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmMainProductCompleteAD : Form
    {
        string _serialNumber = "";
        string _ctQty = "";
        int _gtQty = 0;
        string _lotType = "";
        DataTable _gt_DesignDt = new DataTable();
        DataTable _ct_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();
        string _gtType = "";
        string _ctType = "";
        string _palletType = "";
        string _buttonType = "";
        bool _search_open_flag = false;
        string _goodLocation = "";

        DataTable _woDt = new DataTable();


        public frmMainProductCompleteAD()
        {
            InitializeComponent();

            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);
        }

        private void frmMainProductLine_Load(object sender, EventArgs e)
        {
            lblUser.Text = clsStatic._USER_NAME;
            btnTitle.Text = clsStatic._RESOURCE_TEXT + "(" + clsStatic._RESOURCE_CD + ")";

            if (clsStatic._PUSHBUTTON1.IndexOf("COM") == 0)
            {
                try
                {
                    serialButton1.PortName = clsStatic._PUSHBUTTON1;
                    serialButton1.Open();
                    _buttonType = "ONE";
                }
                catch
                {

                }
            }

            if (clsStatic._PUSHBUTTON2.IndexOf("COM") == 0)
            {
                try
                {
                    serialButton2.PortName = clsStatic._PUSHBUTTON2;
                    serialButton2.Open();

                    _buttonType = "TWO";
                }
                catch
                {

                }
            }

            initLabel();
            InitGTList();
            InitCTList();
            InitBADList();
            InitCTDetailList();

            serialButton1.DataReceived += SerialButton1_DataReceived;
            serialButton2.DataReceived += SerialButton2_DataReceived;

            get_prodqty_by_resource();
        }

        #region INIT
        private void SerialButton1_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            string buf = serialButton1.ReadLine();
            buf = buf.Replace("\r", "");

            if (buf == "1")
            {
                if (btnPOSearch.Text == "선택")
                {
                    this.Invoke(new MethodInvoker(delegate ()
                    {
                        if (clsStatic._WORK_ORDER_ID != "")
                        {
                            button_po_search();
                        }
                    }
                    ));

                }
                else
                {
                    this.Invoke(new MethodInvoker(delegate ()
                    {
                        if (clsStatic._WORK_ORDER_ID != "")
                        {
                            button_label_print();
                        }
                    }
                    ));
                }
            }
            else if (buf == "2")
            {
                if (btnPOSearch.Text == "선택")
                {
                    frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }
                else
                {
                    this.Invoke(new MethodInvoker(delegate ()
                    {
                        if (clsStatic._WORK_ORDER_ID != "")
                        {
                            button_badqty();
                        }
                    }
                    ));
                }
            }
        }

        private void SerialButton2_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            string buf = serialButton2.ReadLine();
            buf = buf.Replace("\r", "");

            if (buf == "2")
            {
                button_noaction();
            }
        }

        private void InitGTList()
        {
            //                                   0                   1      
            string[] headerText = new string[] { "SN", "QTY" }; //2
            string[] columnName = new string[] { "WORKORDERRESULTID", "GOODQTY" };
            string[] columnType = new string[] { "T", "T" };

            int[] columnWidth = new int[] { 250, 100 };
            bool[] columnVisible = new bool[] { true, true };
            bool[] columnDisable = new bool[] { true, true };
            string[] cellAlign = new string[] { "C", "C" };

            grdGT.SetBorderAndGridlineStyles();
            grdGT.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGT.DefaultCellStyle.Font = new Font("맑은고딕", 12, FontStyle.Bold);
            grdGT.RowTemplate.Height = 50;
        }

        private void InitCTList()
        {
            //                                   0                         
            string[] headerText = new string[] { "박스포장번호", "구성수량" }; //2
            string[] columnName = new string[] { "CT", "QTY" };
            string[] columnType = new string[] { "T", "T" };

            int[] columnWidth = new int[] { 250, 100 };
            bool[] columnVisible = new bool[] { true, true };
            bool[] columnDisable = new bool[] { true, true };
            string[] cellAlign = new string[] { "C", "C" };

            grdCT.SetBorderAndGridlineStyles();
            grdCT.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdCT.DefaultCellStyle.Font = new Font("맑은고딕", 12, FontStyle.Bold);
            grdCT.RowTemplate.Height = 50;
        }

        private void InitCTDetailList()
        {
            //                                   0                     1                 
            string[] headerText = new string[] { "SN", "박스포장번호" }; //1
            string[] columnName = new string[] { "WORKORDERRESULTID", "CT" };
            string[] columnType = new string[] { "T", "T" };

            int[] columnWidth = new int[] { 150, 150 };
            bool[] columnVisible = new bool[] { true, true };
            bool[] columnDisable = new bool[] { true, true };
            string[] cellAlign = new string[] { "C", "C" };

            grdCTDetail.SetBorderAndGridlineStyles();
            grdCTDetail.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdCTDetail.DefaultCellStyle.Font = new Font("맑은고딕", 12, FontStyle.Bold);
            grdCTDetail.RowTemplate.Height = 50;
        }

        private void InitBADList()
        {
            //                                   0                   1      
            string[] headerText = new string[] { "SN", "QTY" }; //2
            string[] columnName = new string[] { "WORKORDERRESULTID", "BADQTY" };
            string[] columnType = new string[] { "T", "T" };

            int[] columnWidth = new int[] { 250, 100 };
            bool[] columnVisible = new bool[] { true, true };
            bool[] columnDisable = new bool[] { true, true };
            string[] cellAlign = new string[] { "C", "C" };

            grdBad.SetBorderAndGridlineStyles();
            grdBad.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdBad.DefaultCellStyle.Font = new Font("맑은고딕", 12, FontStyle.Bold);
            grdBad.RowTemplate.Height = 50;
        }

        #endregion

        #region 화면 상단 영역 버튼 Event

        /// <summary>
        /// 설비 선택 화면 오픈
        /// </summary>
        private void btnTitle_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "LINE";
            clsStatic._dialogValue = "";

            frmCommonSelect frm = new frmCommonSelect("라인");
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                btnTitle.Text = clsStatic._dialogValue;
                string[] strs = clsStatic._dialogValue.Split('(');

                clsStatic._RESOURCE_CD = strs[strs.Length - 1].Substring(0, strs[strs.Length - 1].Length - 1);
                clsStatic._RESOURCE_TEXT = strs[0];

                initLabel();
                get_prodqty_by_resource();
            }

            clsStatic._resouceType = "";
            clsStatic._dialogValue = "";

            /*
            wo_search("NO");
            txtSN_Focus();
            */
        }

        /// <summary>
        /// 투입인원
        /// </summary>
        private void btnWorker_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(clsStatic._PERSONCOUNT);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                clsStatic._PERSONCOUNT = clsStatic._dialogValue;

                btnWorker.Text = $"투입인원\n{clsStatic._PERSONCOUNT}명";

                clsStatic._dialogValue = "";
            }
        }

        /// <summary>
        /// 직전박스라벨 재발행
        /// </summary>
        private void btnReprint_Click(object sender, EventArgs e)
        {
            string retbuf = "";
            retbuf = get_ganbanSeq();

            if (retbuf == "NG")  //인쇄중
            {
                frmMessage frm1 = new frmMessage("현재 라벨발행 진행중입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (((DataTable)grdCT.DataSource).Rows.Count > 0)
            {
                string ct = ((DataTable)grdCT.DataSource).Rows[0]["CT"].ToString();

                insert_ganban_tmp(retbuf, ct, "CT");

                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", ct, "", "", ref _BasicDs);

                delete_temp(retbuf, "GANBAN");
                //frm.ShowDialog();
                txtSN_Focus();
            }
            else
            {
                frmMessage frm1 = new frmMessage("재발행할 라벨이 존재하지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }
        }

        private void insert_ganban_tmp(string labelId, string ganbanId, string ganbanType)
        {
            string retvalue = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("p_err_msg", "");
            paramsCheckMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("P_LABEL_ID", labelId);
            paramsCheckMap.Add("P_IP_ADDRESS", clsStatic._PALLETPRINT);
            paramsCheckMap.Add("P_GANBAN_ID", ganbanId);
            paramsCheckMap.Add("P_GANBAN_TYPE", ganbanType);

            paramsCheckList.Add(paramsCheckMap);

            DataTable result = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganban_tmp.dummy", paramsCheckList, clsStatic._serviceUsertURL, ref retvalue);

            if (result == null)
            {
                frmMessage frm1 = new frmMessage("실행중 오류가 발생하였습니다. 다시 시도 해주십시오.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (result.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("실행중 오류가 발생하였습니다. 다시 시도 해주십시오.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }
        }

        /// <summary>
        /// Pallet라벨 출력
        /// </summary>
        private void btnPallet_Click(object sender, EventArgs e)
        {
            if (btnPOSearch.Text == "선택")
            {
                frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            frmMessage frm = new frmMessage($"Pallet라벨 발행하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                string retbuf = "";

                try
                {
                    if (_palletType == "")
                    {
                        frmMessage frm1 = new frmMessage("해당 모델의 Pallet라벨정보가 설정되어 있지 않습니다.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        txtSN_Focus();
                        return;
                    }

                    if (get_noPalletQty() < 1)
                    {
                        frmMessage frm1 = new frmMessage("Pallet라벨을 발행할 실적이 없습니다.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        txtSN_Focus();
                        return;
                    }

                    retbuf = get_ganbanSeq();

                    if (retbuf == "NG")
                    {
                        frmMessage frm1 = new frmMessage("현재 라벨발행 진행중입니다. 잠시후 다시 시도해주십시오.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        txtSN_Focus();
                        return;
                    }

                    //Pallet라벨 발생
                    create_pallet_label(retbuf);

                    //라벨Print
                    ganban_print(retbuf);

                    frmMessage frm2 = new frmMessage("Pallet라벨 발행이 완료되었습니다.", "AUTOCLOSE");
                    frm2.ShowDialog();
                    txtSN_Focus();
                }
                catch (Exception ex)
                {
                    delete_temp(retbuf, "GANBAN");
                    frmMessage success = new frmMessage(ex.Message, "AUTOCLOSE");
                    success.ShowDialog();
                }

            }
        }

        /// <summary>
        /// Pallet라벨 생성되지 않은 실적 수량 조회
        /// </summary>
        private int get_noPalletQty()
        {
            string retvalue = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("WORK_ORDER_ID", btnPOSearch.Text);

            paramsCheckList.Add(paramsCheckMap);

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_nonPalletChk.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                return 999999999;
            }

            if (checkDt.Rows.Count <= 0)
            {
                return 999999999;
            }

            return int.Parse(checkDt.Rows[0]["CNT"].ToString().Trim());
        }

        //Pallet라벨 생성
        private void create_pallet_label(string labelId)
        {
            string retvalue = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("p_err_msg", "");
            paramsCheckMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("P_WORK_ORDER_ID", btnPOSearch.Text);
            paramsCheckMap.Add("P_LABEL_ID", labelId);
            paramsCheckMap.Add("P_IP_ADDRESS", clsStatic._PALLETPRINT);
            paramsCheckMap.Add("P_USER_ID", clsStatic._USER_ID);

            paramsCheckList.Add(paramsCheckMap);

            DataTable result = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_wo_result_pallet.dummy", paramsCheckList, clsStatic._serviceUsertURL, ref retvalue);

            if (result == null)
            {
                frmMessage frm1 = new frmMessage("실행중 오류가 발생하였습니다. 다시 시도 해주십시오.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (result.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("실행중 오류가 발생하였습니다. 다시 시도 해주십시오.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (result.Rows[0]["p_err_code"].ToString() != "S")
            {
                frmMessage frm1 = new frmMessage(result.Rows[0]["p_err_msg"].ToString(), "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                throw new Exception();
            }
        }

        /// <summary>
        /// 불량등록
        /// </summary>
        private void btnBadqty_Click(object sender, EventArgs e)
        {
            if (btnPOSearch.Text == "선택")
            {
                frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            button_badqty();

            if (clsStatic._dialogValue == "OK")
            {
                frmMessage frm = new frmMessage("불량등록 완료되었습니다.", "AUTOCLOSE");
                frm.ShowDialog();
            }
        }

        private void button_badqty()
        {
            clsStatic._dialogValue = "";
            frmBadProductInsert frm = new frmBadProductInsert(btnPOSearch.Text, "1");
            frm.ShowDialog();

            if (clsStatic._dialogValue == "OK")
            {
                wo_search("NO");
            }
        }

        /// <summary>
        /// 작업현황
        /// </summary>
        private void btnWoStatus_Click(object sender, EventArgs e)
        {
            frmWOStatus frm = new frmWOStatus();
            frm.ShowDialog();
        }

        /// <summary>
        /// 닫기
        /// </summary>
        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        #endregion

        #region 화면 메인영역 Event

        /// <summary>
        /// 작업지시 선택
        /// </summary>
        private void btnPOSearch_Click(object sender, EventArgs e)
        {
            button_po_search();
        }

        private void button_po_search()
        {
            bool openFlag1 = serialButton1.IsOpen;
            bool openFlag2 = serialButton2.IsOpen;

            string tmpWorkorderid = clsStatic._WORK_ORDER_ID;
            clsStatic._WORK_ORDER_ID = "";

            _search_open_flag = true;
            frmPOSearch frm = new frmPOSearch("ALL");
            frm.ShowDialog();
            _search_open_flag = false;


            if (clsStatic._WORK_ORDER_ID != "")
            {
                wo_search("OK");
            }
            else
            {
                clsStatic._WORK_ORDER_ID = tmpWorkorderid;
            }

            txtSN_Focus();
        }

        //작업지시 정보 조회
        private void wo_search(string destinationFlag)
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsMap1.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);


            paramsList1.Add(paramsMap1);

            _gtType = "";
            string retvalue = "";

            _woDt.Dispose();
            _woDt = new DataTable();
            _woDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popwo.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (_woDt == null)
            {
                initLabel();
                return;
            }

            if (_woDt.Rows.Count == 0)
            {
                initLabel();
                return;
            }


            #region 작업지서서가 작업지시 상태라면 작업지시서 상태 업데이트 로직
            if (_woDt.Rows[0]["WOSTATE"].ToString().Trim() == "A")
            {
                frmMessage frm = new frmMessage($"현재 생산품의 작업시작을 하겠습니까?\n(품명:{_woDt.Rows[0]["ITEMNAME"].ToString().Trim()})", "OK_CANCEL");
                DialogResult result = frm.ShowDialog();


                // p_serialnumber 값이 LOTSTART 인 경우
                // 해당 WORK_ORDER의 상태 값만 변경 (A-작업지시 to R-시작)
                if (result == DialogResult.OK)
                {
                    string work_order_id = _woDt.Rows[0]["WORKORDERID"].ToString().Trim();

                    List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                    Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                    paramsMap.Add("p_err_code", "");
                    paramsMap.Add("p_err_msg", "");
                    paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
                    paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
                    paramsMap.Add("p_serialnumber", "LOTSTART");
                    paramsMap.Add("p_scode", "");
                    paramsMap.Add("p_ccode", "");
                    paramsMap.Add("p_work_order_id", work_order_id);
                    paramsMap.Add("p_wo_state", "R");
                    paramsMap.Add("p_shift_cd", "DAY");
                    paramsMap.Add("p_work_person", clsStatic._PERSONCOUNT);
                    paramsMap.Add("p_good_qty", "0");
                    paramsMap.Add("p_bad_qty", "0");
                    paramsMap.Add("p_description", "POP 실적");
                    paramsMap.Add("p_close_flag", "N");
                    paramsMap.Add("p_badcode", "NODATA");
                    paramsMap.Add("p_update_by", clsStatic._USER_ID);
                    paramsMap.Add("p_label_id", "");
                    paramsMap.Add("p_ip_address", clsStatic._CTPRINT);

                    paramsList.Add(paramsMap);

                    DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popworesult_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                }
            }

            #endregion

            //BIN이동 화면으로 이동시 넘겨줄 GOOD_LOCATION_CD 정보
            _goodLocation = _woDt.Rows[0]["GOODLOCATIONCD"].ToString();

            _gtType = _woDt.Rows[0]["POPGTLABELID"].ToString();
            _ctType = _woDt.Rows[0]["POPCTLABELID"].ToString();
            _palletType = _woDt.Rows[0]["POPPALLETLABELID"].ToString();

            btnPOSearch.Text = _woDt.Rows[0]["WORKORDERID"].ToString();
            lblProductorderid.Text = _woDt.Rows[0]["PRODUCTORDERID"].ToString();
            lblPlandate.Text = _woDt.Rows[0]["PLANDATE"].ToString();
            lblMakelotqty.Text = _woDt.Rows[0]["POPMAKELOTQTY"].ToString(); //입력수량. NULL 일 경우 작업지시 수량
            lblItem.Text = _woDt.Rows[0]["ITEMID"].ToString();
            lblItemdesc.Text = _woDt.Rows[0]["ITEMNAME"].ToString();
            lblPlanQty.Text = _woDt.Rows[0]["CONFIRMQTY"].ToString(); //계획수량
            lblGoodQty.Text = _woDt.Rows[0]["QTY"].ToString(); //양품수량
            lblBadQty.Text = _woDt.Rows[0]["BADQTY"].ToString(); //불량수량
            lblCancelQty.Text = _woDt.Rows[0]["CANCELQTY"].ToString(); //취소수량

            txtSN.Text = "";


            //*총박스 구성 현황
            // 분모 : 해당 Work_order 의 총 수량 / item_definition 의 MOM 수량
            // 분자 : 해당 Work_order 의 WORK_ORDER_RESULT 의 DISTINCT CT COUNT 수량

            _lotType = _woDt.Rows[0]["POPINPUTTYPE"].ToString();

            // 숨긴 테이블에 대한 초기화 설정
            InitCTDetailList();
            InitCTList();

            List<Dictionary<string, object>> paramsList2 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap2 = new Dictionary<string, object>();
            paramsMap2.Add("p_err_code", "");
            paramsMap2.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap2.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap2.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsMap2.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);

            paramsList2.Add(paramsMap2);

            // GT 리스트 조회 ( PALLETID = 'NODATA', BADCODE = 'NODATA' ) : 박스라벨은 발행되었으나 Pallet발행되지 않은 실적
            DataTable gtDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popgt_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);
            grdGT.DataBindDataSource(gtDt, false, false);

            // CT 리스트 조회 ( CT != 'NODATA' )
            DataTable ctDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popct_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);
            grdCT.DataBindDataSource(ctDt, false, false);

            // 불량 리스트 조회 ( BADCODE != 'NODATA' )
            DataTable badDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popbadprod_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);
            grdBad.DataBindDataSource(badDt, false, false);

            _gtQty = gtCount();
            _ctQty = ctDt.Rows.Count.ToString();
            //박스구성현황
            lblBoxCount.Text = $"{ctDt.Rows.Count.ToString()}/{Math.Ceiling(double.Parse(lblPlanQty.Text) / double.Parse(lblMakelotqty.Text)).ToString()}";

            //총 생산현황
            get_prodqty_by_resource();
        }

        private int gtCount()
        {
            int retbuf = 0;
            for (int i = 0; i < grdGT.Rows.Count; i++)
            {
                int qty = int.Parse(grdGT.Rows[i].Cells["GOODQTY"].Value.ToString());

                retbuf += qty;
            }

            return retbuf;
        }

        /// <summary>
        /// 입력수량
        /// </summary>
        private void lblMakelotqty_Click(object sender, EventArgs e)
        {
            if (btnPOSearch.Text == "선택")
            {
                frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(lblMakelotqty.Text);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblMakelotqty.Text = clsStatic._dialogValue;

                clsStatic._dialogValue = "";
            }
        }

        /// <summary>
        /// 설비 별 총 생산수량
        /// </summary>
        private void get_prodqty_by_resource()
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("P_RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable totalDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_totalProdQtyByResource.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            string prodQty = totalDt.Rows[0]["QTY"].ToString();
            string planQty = totalDt.Rows[1]["QTY"].ToString();
            string month = DateTime.Now.ToString(string.Format("MM", cultures));
            string day = DateTime.Now.ToString(string.Format("dd", cultures));



            lblTotalProd.Text = $"{month}월 {day}일 총 생산현황";
            lblTotalQty.Text = $"{prodQty}/{planQty}";
        }


        #endregion

        #region 바코드 입력창 관련 Event

        //바코드 스캔으로 실적/불량 등록
        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (btnPOSearch.Text == "선택")
                {
                    frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요!", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                DataRow[] drs = null;

                if (clsStatic._BADCODE_LIST.Rows.Count > 0)
                {
                    drs = clsStatic._BADCODE_LIST.Select("BADCODE = '" + txtSN.Text + "'");
                }
                //불량코드일 경우
                if (drs != null && drs.Length > 0)
                {
                    frmBadProductInsert frm = new frmBadProductInsert(btnPOSearch.Text, "1", txtSN.Text);
                    frm.ShowDialog();

                    if (clsStatic._dialogValue == "OK")
                    {
                        frmMessage frm1 = new frmMessage("불량등록 완료되었습니다.", "AUTOCLOSE");
                        frm1.ShowDialog();

                        wo_search("NO");
                    }
                }
                //실적코드일 경우
                else
                {
                    button_label_print();
                }

                txtSN.Text = "";
            }
        }

        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        private void txtSN_Leave(object sender, EventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Red;
            }
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Yellow;
            }
        }

        private void lblLine_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }
        #endregion

        #region 화면 우측 영역 Event

        //실적입력 버튼 클릭
        private void btnLabelPrint_Click(object sender, EventArgs e)
        {
            if (btnPOSearch.Text == "선택")
            {
                frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (_ctType == "")
            {
                frmMessage frm1 = new frmMessage("해당 모델의 박스라벨정보가 설정되어 있지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            button_label_print();
        }

        /// <summary>
        /// 실적등록
        /// </summary>
        private void button_label_print()
        {
            if (_search_open_flag == true)
            {
                return;
            }

            string retbuf = "";
            retbuf = get_ganbanSeq();

            if (retbuf == "NG") //wait 
            {
                frmMessage frm1 = new frmMessage("현재 라벨발행 진행중입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            double planQty = double.Parse(lblPlanQty.Text.Trim()); //계획수량 
            string prodQty = (double.Parse(lblGoodQty.Text.Trim()) + double.Parse(lblMakelotqty.Text)).ToString("#####.##"); //양품수량

            //입력수량(등록할 실적수량)
            string inputQty = lblMakelotqty.Text;

            //실적수량이 계획수량보다 크거나 같을 경우 실적수량 입력 가능한 창 뜨도록 함
            if (planQty <= double.Parse(prodQty))
            {
                clsStatic._dialogValue = "";

                frmLoginIDInsert frm = new frmLoginIDInsert(inputQty);
                frm.ShowDialog();

                if (clsStatic._dialogValue != "")
                {
                    inputQty = clsStatic._dialogValue;

                    clsStatic._dialogValue = "";
                }
                else
                {
                    return;
                }
            }

            try
            {

                product_insert_new(retbuf, inputQty.Replace(",", ""), "Y"); //실적등록 

                ganban_print(retbuf); //


                wo_search("NO");

                //frmMessage success = new frmMessage("실적 처리가 완료 되었습니다.", "AUTOCLOSE");
                //success.ShowDialog();
            }
            catch (Exception ex)
            {
                delete_temp(retbuf, "GANBAN");
                frmMessage success = new frmMessage("실적 처리가 실패 하였습니다. 다시 시도 해주십시오.", "AUTOCLOSE");
                success.ShowDialog();
            }

            txtSN_Focus();
        }

        private void product_insert_new(string labelId, string qty, string ganbanyn)
        {

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_serialnumber", "");
            paramsMap.Add("p_scode", "K");
            paramsMap.Add("p_ccode", "HA");
            paramsMap.Add("p_work_order_id", btnPOSearch.Text);
            paramsMap.Add("p_wo_state", "R");
            paramsMap.Add("p_shift_cd", "DAY");
            paramsMap.Add("p_work_person", clsStatic._PERSONCOUNT);
            paramsMap.Add("p_good_qty", qty);
            paramsMap.Add("p_bad_qty", "0");
            paramsMap.Add("p_description", "POP 실적");
            paramsMap.Add("p_close_flag", "N");
            paramsMap.Add("p_badcode", "NODATA");
            paramsMap.Add("p_update_by", clsStatic._USER_ID);
            paramsMap.Add("p_label_id", labelId);
            paramsMap.Add("p_ip_address", clsStatic._CTPRINT);

            paramsList.Add(paramsMap);

            string retvalue = "";


            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popworesult_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "S")
            {
                wo_search("NO");
            }
            else
            {
                frmMessage frm = new frmMessage(dt.Rows[0]["p_err_msg"].ToString(), "AUTOCLOSE");
                frm.ShowDialog();
                throw new Exception();
            }

        }

        /// <summary>
        /// 작업지시 마감
        /// </summary>
        private void btnWoClose_Click(object sender, EventArgs e)
        {

            if (btnPOSearch.Text == "선택")
            {
                frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            frmMessage frm = new frmMessage($"현재 작업지시서를 마감처리 하시겠습니까?\n생산수량:{lblGoodQty.Text}/계획수량:{lblPlanQty.Text}", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                int noPalletQty = get_noPalletQty();

                if (noPalletQty == 999999999)
                {
                    frmMessage frm1 = new frmMessage("실행중 오류가 발생하였습니다. 다시 시도 해주십시오.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                if (noPalletQty > 0)
                {
                    frmMessage frm1 = new frmMessage("Pallet라벨이 생성되지 않은 박스라벨이 있습니다.\nPallet라벨 생성 후 다시 시도 해주십시오.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                //작업지시 마감처리
                close_workOrder();

                frmMessage frm2 = new frmMessage("작업지시 마감처리 완료되었습니다.", "AUTOCLOSE");
                frm2.ShowDialog();

                initLabel();
            }
        }

        /// <summary>
        /// 작업지시 마감
        /// </summary>
        private void close_workOrder()
        {
            string retvalue = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("p_err_msg", "");
            paramsCheckMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("P_WORK_ORDER_ID", btnPOSearch.Text);
            paramsCheckMap.Add("P_USER_ID", clsStatic._USER_ID);

            paramsCheckList.Add(paramsCheckMap);

            DataTable result = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.close_workorder.dummy", paramsCheckList, clsStatic._serviceUsertURL, ref retvalue);

            if (result == null)
            {
                frmMessage frm1 = new frmMessage("실행중 오류가 발생하였습니다. 다시 시도 해주십시오.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (result.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("실행중 오류가 발생하였습니다. 다시 시도 해주십시오.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

        }

        #endregion

        #region 라벨 프린트 관련 Event
        // 동일 labelid(tmp 테이블 구분자) 발행
        private void ganban_print(string labelid)
        {
            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("LABEL_ID", labelid);

            paramsCheckList.Add(paramsCheckMap);
            string retvalue = "";
            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanPrintList.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                frmMessage frm1 = new frmMessage("출력할 라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (checkDt.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("출력할 라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            for (int i = 0; i < checkDt.Rows.Count; i++)
            {
                if (checkDt.Rows[i]["GANBANTYPE"].ToString() == "CT") //박스라벨
                {
                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", checkDt.Rows[i]["GANBANID"].ToString(), "", "", ref _BasicDs);
                }
                else if (checkDt.Rows[i]["GANBANTYPE"].ToString() == "PT") //Pallet라벨
                {
                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, checkDt.Rows[i]["GANBANID"].ToString(), "", "", "", "", ref _BasicDs);
                }
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_LABEL_ID", labelid);

            paramsList.Add(paramsMap);

            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.deleteGanbanTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

        }

        /// <summary>
        /// 인쇄대기 라벨 존재유무 확인
        /// </summary>
        private string get_ganbanSeq()
        {
            string retvalue = "";
            string retbuf = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("IP_ADDRESS", clsStatic._CTPRINT);

            paramsCheckList.Add(paramsCheckMap);

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanCheck.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                return "NG";
            }

            if (checkDt.Rows.Count <= 0)
            {
                return "NG";
            }

            if (int.Parse(checkDt.Rows[0]["LABELCNT"].ToString().Trim()) > 0)
            {
                return "NG";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanseq.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt == null)
            {
                return "NG";
            }

            if (dt.Rows.Count <= 0)
            {
                return "NG";
            }

            retbuf = dt.Rows[0]["GANBANSEQ"].ToString().Trim();

            return retbuf;

        }
        #endregion

        #region 기타/공용 Event
        private void initLabel()
        {
            btnPOSearch.Text = "선택";
            lblProductorderid.Text = "";
            lblPlandate.Text = "";
            lblMakelotqty.Text = "";
            lblItem.Text = "";
            lblItemdesc.Text = "";
            lblPlanQty.Text = "";
            lblGoodQty.Text = "";
            lblBadQty.Text = "";
            lblCancelQty.Text = "";
            txtSN.Text = "";
            _ctQty = "";
            lblBoxCount.Text = "/";

            grdGT.RemoveAll();
            grdCT.RemoveAll();
            grdCTDetail.RemoveAll();
            grdBad.RemoveAll();
        }

        private void delete_temp(string moveId, string tmpType)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_TMP_TYPE", tmpType);
            paramsMap.Add("P_TMP_ID", moveId);
            paramsList.Add(paramsMap);
            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.del_TmpData_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void frmMainProductComplete_FormClosed(object sender, FormClosedEventArgs e)
        {
            serialButton1.Close();
            serialButton2.Close();
        }

        #endregion





        #region 미사용 Event (AD인터내셔널)

        private void timerButtonClose_Tick(object sender, EventArgs e)
        {
            timerButtonClose.Enabled = false;
            serialButton1.Close();
        }

        private void btnNoaction_Click(object sender, EventArgs e)
        {
            if (btnPOSearch.Text == "선택")
            {
                frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            button_noaction();
        }

        private void button_noaction()
        {
            frmMessage frm = new frmMessage("비가동 작업중", "AUTOCLOSE");
            frm.ShowDialog();
            return;
        }

        private void lblDestination_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "DESTINATION";
            clsStatic._dialogValue = "";
            frmCommonSelect frm = new frmCommonSelect("향지");
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                clsStatic._dialogValue = "";
            }
        }

        private void btnCtReprintNewForm_Click(object sender, EventArgs e)
        {
            if (btnPOSearch.Text == "선택")
            {
                frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            frmCTReprint frm = new frmCTReprint(grdCT.BindDataTable, _gtType, _ctType, _gt_DesignDt, _ct_DesignDt, _BasicDs);
            frm.ShowDialog();
        }

        /// <summary>
        /// 박스라벨 발행되지 않은 실적 수량 조회 (AD 미사용)
        /// </summary>
        private int getNoLabelQty()
        {
            string retvalue = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("WORK_ORDER_ID", btnPOSearch.Text);

            paramsCheckList.Add(paramsCheckMap);

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_noLabelQty.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                return 999999999;
            }

            if (checkDt.Rows.Count <= 0)
            {
                return 999999999;
            }

            return int.Parse(checkDt.Rows[0]["QTY"].ToString().Trim());

        }

        /// <summary>
        /// 실적취소 화면 이동 (AD 미사용)
        /// </summary>
        private void btnResultCancel_Click(object sender, EventArgs e)
        {
            frmWoResultCancel frm = new frmWoResultCancel();
            frm.ShowDialog();

            if (clsStatic._WORK_ORDER_ID != "")
            {
                wo_search("OK");
            }
        }

        #endregion

        private void lblUser_Click(object sender, EventArgs e)
        {

        }
    }
}

