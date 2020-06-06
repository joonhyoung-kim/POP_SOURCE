using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmMaterialGI : Form
    {
        DataTable _moveDt = new DataTable();
        DataTable _departureDt = new DataTable();
        DataTable _scanDt = new DataTable();
        DataTable _poDt = new DataTable();
        DataTable _woDt = new DataTable();

        string _woList = "";

        public frmMaterialGI()
        {
            InitializeComponent();

            lblFromStock.Text = clsStatic._FROMLINE_DESC + "(" + clsStatic._FROMLINE + ")";
            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");
            lblNowdate.Text = DateTime.Now.ToString(string.Format("yyyy-MM-dd ddd", cultures));

            InitLineCombo();
            InitGridList();

            btnSet_Click(null, null);
        }

        #region Init
        private void newScanDt()
        {
            _scanDt.Dispose();
            _scanDt = new DataTable();

            _scanDt.Columns.Add("GANBANID");
            _scanDt.Columns.Add("SCANQTY");
            _scanDt.Columns.Add("TOLINE");
            _scanDt.Columns.Add("MATERIAL_REQUEST_ID");
        }

        private void InitLineCombo()
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);

            paramsList1.Add(paramsMap1);

            string retvalue = "";
            DataTable facilityDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialGILine_list.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if(facilityDt.Rows.Count == 0)
            {
                btnListSearch.Enabled = false;
                frmMessage frm = new frmMessage("생산창고가 존재하지 않거나, 공정차감이 미사용으로 되어 있습니다. MOM의 관리자.코드관리 화면에서 확인 하여 주세요.", "OK");
                frm.ShowDialog();
                return;
            }

            comboLine.DataSource = facilityDt;
            comboLine.DisplayMember = "facilityName";
            comboLine.ValueMember = "facilityCd";
        }

        private void InitGridList()
        {
            //                                   0            1                 2         3           4                5                6              8              7            9             10            11              12               13                 14                 15                   16          17                  18                19                   20            21
            string[] headerText = new string[] { "불출상태",  "작업지시서",     "품목",   "품명",     "규격",          "현재고",      "계획수량",      "요청수량",    "잔량",      "스캔수량",  "요청일",      "구분",         "요청창고ID",    "요청창고",        "요청유형",        "불출요청번호",      "Market",   "OUTSOURCINGFLAG",  "단위",           "단위수량",          "환종",       "LABELYN" }; 
            string[] columnName = new string[] { "STATENAME", "WORKORDERID",    "ITEMID", "ITEMNAME", "SPECIFICATION", "CURRENTQTY",  "CONFIRMQTY",    "REQUESTQTY",  "REMAINQTY", "SCANQTY",   "REQUESTDATE", "ITEMTYPENAME", "OUTLOCATIONCD", "OUTLOCATIONNAME", "REQUESTTYPENAME", "MATERIALREQUESTID", "MARKETCD", "OUTSOURCINGFLAG",  "CONVERSIONUNIT", "CONVERSIONUNITQTY", "CURRENCYCD", "LABELYN" };
            string[] columnType = new string[] { "T",         "T",              "T",      "T",        "T",             "T",           "T",             "T",           "T",          "T",        "T",           "T",            "T",             "T",                "T",              "T",                 "T",        "T",                "T",              "T",                 "T",          "T"       };
                                                                                                                                                                                                                                                                                                                                                                              
            int[] columnWidth    = new int[]   { 110,          195,             195,      270,         270,            130,           130,             130,           130,         130,          160,           80,             270,             270,               140,              250,                  250,       250,                250,              250,                 250,          100       };
            bool[] columnVisible = new bool[]  { true,         true,            true,     true,        true,           true,          true,            true,          true,        true,         true,          true,           true,            true,              true,             true,                 true,      true,               true,             true,                true,         false     };
            bool[] columnDisable = new bool[]  { true,         true,            true,     true,        true,           true,          true,            true,          true,        true,         true,          true,           true,            true,              true,             true,                 true,      true,               true,             true,                true,         true      };
            string[] cellAlign = new string[]  { "C",         "C",              "L",      "L",         "L",            "R",           "R",             "R",           "R",         "R",          "C",           "C",            "L",             "L",               "R",              "C",                  "C",       "C",                "C",              "C",                 "C",          "C"       };
                                                                                                                                                                                                  
            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 18);
            grdMain.DefaultCellStyle.ForeColor = Color.Black;
            grdMain.RowTemplate.Height = 70;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 19, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        #endregion

        #region 바코드 입력창 event
        /// <summary>
        /// 바코드 입력창 포커스
        /// </summary>
        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        /// <summary>
        /// 바코드 입력창 포커스 잃을 경우
        /// </summary>
        private void txtSN_Leave(object sender, EventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Red;
            }
        }

        /// <summary>
        /// 바코드 스캔
        /// </summary>
        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (txtSN.Text.Trim() == "")
                {
                    return;
                }
                else
                {
                    add_Ganban();
                }
                txtSN_Focus();
            }
        }

        /// <summary>
        /// 스캔한 간판 수량 등록
        /// </summary>
        private void add_Ganban()
        {
            string ganban = "";
            ganban = txtSN.Text.Trim();

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("LOCATION_CD", clsStatic._FROMLINE);
            paramsMap1.Add("GANBAN_TYPE", "DP");
            paramsMap1.Add("WORK_ORDER_ID", "");
            paramsMap1.Add("GI_GANBAN_ID", ganban);
            paramsMap1.Add("DEPARTURE_GROUP_ID", "");
            paramsMap1.Add("dateFlag", "");
            paramsMap1.Add("USE_YN", "Y");

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanBodyList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (ganBodyDt == null)
            {
                frmMessage frm1 = new frmMessage("입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganBodyDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            DataRow[] drs = _scanDt.Select("GANBANID = '" + ganban + "'");

            if (drs.Length > 0)
            {
                frmMessage frm1 = new frmMessage("이미 입력한 간판라벨입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string toline = "";
            string matReqId = "";
            double scanQty = 0;
            string scanDtInsertFlag = "NO";
            int lastRowNum = 0;

            bool firstaddFlag = false;

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string grid_itemId = grdMain["품목", i].Value.ToString();

                if (grid_itemId == ganBodyDt.Rows[0]["ITEMID"].ToString().Trim())
                {
                    firstaddFlag = true;
                    //해당 ROW의 번호
                    lastRowNum = i;
                        
                    //그리드의 품목과 스캔한 간판 라벨의 품목이 동일하다면
                    if (grdMain["불출상태", i].Value.ToString() != "불출완료")
                    {
                        if (double.Parse(grdMain["잔량", i].Value.ToString().Trim().Replace(",", "")) > double.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", "")))
                        {
                            string viewtest = "";

                            double planQty = planQty = double.Parse(grdMain["잔량", i].Value.ToString().Trim().Replace(",", ""));
                            scanQty = double.Parse(ganBodyDt.Rows[0]["QTY"].ToString().Trim());

                            if (planQty <= scanQty + double.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", "")))
                            {
                                for (int j = 0; j < grdMain.Columns.Count; j++)
                                {
                                    grdMain[j, i].Style.ForeColor = Color.Red;
                                }
                            }
                            else
                            {
                                for (int j = 0; j < grdMain.Columns.Count; j++)
                                {
                                    grdMain[j, i].Style.ForeColor = Color.Black;
                                }
                            }
                            toline = grdMain["요청창고ID", i].Value.ToString().Trim();
                            matReqId = grdMain["불출요청번호", i].Value.ToString();
                            grdMain["스캔수량", i].Value = (double.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", "")) + scanQty).ToString("###,###.##");
                            scanDtInsertFlag = "OK";
                            break;
                        }
                    }
                }
            }            

            if(scanDtInsertFlag != "OK")
            {
                if (firstaddFlag)
                {
                    scanQty = double.Parse(ganBodyDt.Rows[0]["QTY"].ToString().Trim());
                    toline = grdMain["요청창고ID", lastRowNum].Value.ToString().Trim();
                    matReqId = grdMain["불출요청번호", lastRowNum].Value.ToString();
                    grdMain["스캔수량", lastRowNum].Value = (double.Parse(grdMain["스캔수량", lastRowNum].Value.ToString().Trim().Replace(",", "")) + scanQty).ToString("###,###.##");
                    scanDtInsertFlag = "OK";
                }
            }

            if (scanDtInsertFlag == "OK")
            {
                _scanDt.Rows.Add(ganban, scanQty.ToString(), toline, matReqId);
            }
            

        }


        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Yellow;
            }
        }

        #endregion

        #region 그리드 Event

        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (grdMain.Rows.Count <= 0)
            {
                lblItem.Text = "";
                lblQty.Text = "";
            }
            else
            {
                int nownow = grdMain.CurrentRow.Index;
                lblItem.Text = grdMain["품목", nownow].Value.ToString();
                lblQty.Text = grdMain["스캔수량", nownow].Value.ToString().Trim().Replace(",", "");
            }
        }

        private void grdMain_Color_change()
        {
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                grdMain["품목", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["품명", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["규격", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);

                grdMain["잔량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold | FontStyle.Underline);
                grdMain["잔량", i].Style.BackColor = Color.DodgerBlue;

                grdMain["스캔수량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold | FontStyle.Underline);
                grdMain["스캔수량", i].Style.BackColor = Color.DodgerBlue;

                double remainQty = double.Parse(grdMain["잔량", i].Value.ToString());
                double scanQty = double.Parse(grdMain["스캔수량", i].Value.ToString());

                if (remainQty <= scanQty && scanQty > 0)
                {
                    for (int j = 0; j < grdMain.Columns.Count; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Red;
                    }
                }
                else if (grdMain["불출상태", i].Value.ToString() == "출고완료")
                {
                    for (int j = 0; j < grdMain.Columns.Count; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Red;
                    }
                }
                else
                {
                    for (int j = 0; j < grdMain.Columns.Count; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Black;
                    }
                }
            }
        }

        #endregion

        #region 불출요청 리스트 조회 Event
        /// <summary>
        /// 불출리스트 조회 버튼 클릭 (작업지시서 리스트 조회)
        /// </summary>
        private void btnListSearch_Click(object sender, EventArgs e)
        {
            newScanDt();

            frmMatGIWOList frm = new frmMatGIWOList(lblNowdate.Text, comboLine.SelectedValue.ToString());
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                get_GI_list(clsStatic._dialogValue);

                clsStatic._dialogValue = "";
            }
        }

        /// <summary>
        /// 선택한 작업지시서의 불출요청서 리스트 조회
        /// </summary>
        private void get_GI_list(string woList)
        {
            string nowdate = lblNowdate.Text.Split(' ')[0];
            _woList = woList;

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("fromDate", "");
            paramsMap.Add("toDate", "");
            paramsMap.Add("productOrderId", "");
            paramsMap.Add("workOrderId", _woList.Substring(0, _woList.Length - 1));
            paramsMap.Add("outLocationCd", comboLine.SelectedValue);
            paramsMap.Add("locationCd", clsStatic._FROMLINE);
            paramsMap.Add("stockType", clsStatic._STOCK_TYPE);
            paramsList.Add(paramsMap);

            string retvalue = "";

            _moveDt.Dispose();
            _moveDt = new DataTable();
            _moveDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialRelease_list2.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            grdMain.RemoveAll();
            if (_moveDt == null)
            {
                return;
            }

            if (_moveDt.Rows.Count == 0)
            {
                grdMain.RemoveAll();
            }

            grdMain.DataBindDataSource(_moveDt, false, false);
            grdMain_Color_change();
            txtSN_Focus();
        }

        #endregion
        
        #region 불출처리 Event
        /// <summary>
        /// 불출 버튼 클릭
        /// </summary>
        private void btnGI_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                double planQty = 0;
                double scanQty = 0;

                planQty = double.Parse(grdMain["잔량", i].Value.ToString().Trim().Replace(",", ""));
                scanQty = double.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", ""));

                if (planQty <= scanQty || scanQty == 0)
                {
                    continue;
                }
                else
                {
                    frmMessage frm1 = new frmMessage("스캔수량은 잔량보다 많거나 같아야 불출 처리가 가능합니다.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }
            }

            frmMessage frm = new frmMessage("입력한 품목들을 불출처리 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {

                string retbuf = "";
                retbuf = get_moveSeq();

                if (retbuf == "NG")
                {
                    frmMessage frm1 = new frmMessage("현재 불출처리가 진행중입니다. 잠시후 불출처리 진행 하여 주세요.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                string moveId = retbuf;

                string desc = "POP 불출처리";

                try
                {
                    string outFlag = "NO";
                    for (int i = 0; i < grdMain.Rows.Count; i++)
                    {
                        Color color = grdMain["스캔수량", i].Style.ForeColor;

                        if (color == Color.Red && grdMain["불출상태", i].Value.ToString().Trim() != "출고완료")
                        {
                            string materialRequestId = ret_value(grdMain["불출요청번호", i].Value);
                            string workOrderId = ret_value(grdMain["작업지시서", i].Value);
                            string itemId = ret_value(grdMain["품목", i].Value);
                            string remainQty = ret_value(grdMain["스캔수량", i].Value).Replace(",", "");
                            string inLocationCd = clsStatic._FROMLINE;
                            string outLocationCd = ret_value(grdMain["요청창고ID", i].Value);
                            string outsourcingFlag = ret_value(grdMain["OUTSOURCINGFLAG", i].Value).Replace(",", "");
                            string conversionUnit = ret_value(grdMain["단위", i].Value);
                            string conversionUnitQty = ret_value(grdMain["단위수량", i].Value).Replace(",", "");
                            string marketCd = ret_value(grdMain["Market", i].Value);
                            string currencyCd = ret_value(grdMain["환종", i].Value);

                            //MOM_POP_MATERIAL_REQUEST_TMP 테이블 INSERT
                            gi_item_tmp_insert(moveId, materialRequestId, workOrderId, itemId, remainQty, inLocationCd, outLocationCd, outsourcingFlag, conversionUnit, conversionUnitQty, marketCd, currencyCd);

                            outFlag = "OK";
                        }
                    }

                    if (outFlag == "OK")
                    {
                        for (int i = 0; i < _scanDt.Rows.Count; i++)
                        {
                            string gikeycol = _scanDt.Rows[i]["GANBANID"].ToString().Trim();
                            string toline = _scanDt.Rows[i]["TOLINE"].ToString().Trim();
                            string matReqId = _scanDt.Rows[i]["MATERIAL_REQUEST_ID"].ToString().Trim();
                            //MOM_POP_LABEL_GI_TMP 테이블 INSERT
                            gi_label_tmp_insert(moveId, gikeycol, toline, matReqId);
                        }

                        //
                        material_gi(moveId);


                        lblItem.Text = "";
                        lblQty.Text = "";
                        txtSN.Text = "";
                        grdMain.RemoveAll();
                        newScanDt();
                        get_GI_list(_woList);
                    }
                    else
                    {
                        frmMessage frm1 = new frmMessage("불출 대상이 존재하지 않습니다.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        txtSN_Focus();
                        return;
                    }
                }
                catch (Exception ex)
                {
                    deleteTmp(moveId);
                    frmMessage frm1 = new frmMessage("불출처리 시 오류가 발생하였습니다. 다시 실행하여주십시오.", "AUTOCLOSE");
                    frm1.ShowDialog();
                }
                
                txtSN_Focus();
                return;
            }
        }

        /// <summary>
        /// Default BIN 존재 유무 확인
        /// </summary>
        /// <returns></returns>
        private string to_location_out_bin_chk()
        {
            string retvalue = "";
            string binId = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("LOCATION_CD", clsStatic._TOLINE);

            paramsCheckList.Add(paramsMap);

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getInDefaultBin.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                return "NG";
            }

            if (checkDt.Rows.Count <= 0)
            {
                return "NG";
            }

            binId = checkDt.Rows[0]["BINID"].ToString().Trim();

            return binId;
        }


        /// <summary>
        /// 불출처리 시 MOVE_ID 취득 (불출대기 상태 여부 확인용)
        /// </summary>
        private string get_moveSeq()
        {
            string retvalue = "";
            string retbuf = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);

            paramsCheckList.Add(paramsCheckMap);

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGIseqCheck.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                return "NG";
            }

            if (checkDt.Rows.Count < 0)
            {
                return "NG";
            }

            if (int.Parse(checkDt.Rows[0]["MOVECNT"].ToString().Trim()) > 0)
            {
                return "NG";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getMoveseq.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt == null)
            {
                return "NG";
            }

            if (dt.Rows.Count <= 0)
            {
                return "NG";
            }

            retbuf = dt.Rows[0]["MOVESEQ"].ToString().Trim();

            return retbuf;

        }

        private string ret_value(object value)
        {
            string retbuf = "";

            if (value == null)
            {
                return retbuf;
            }

            retbuf = value.ToString();

            return retbuf;
        }

        /// <summary>
        /// MOM_POP_MATERIAL_REQUEST_TMP 테이블 INSERT
        /// </summary>
        private void gi_item_tmp_insert(string moveId, string materialRequestId, string workOrderId, string itemId, string remainQty,
                                        string inLocationCd, string outLocationCd, string outsourcingFlag, string conversionUnit, string conversionUnitQty,
                                        string marketCd, string currencyCd)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("moveId", moveId);
            paramsMap.Add("transferFlag", "WAIT");
            paramsMap.Add("materialRequestId", materialRequestId);
            paramsMap.Add("workOrderId", workOrderId);
            paramsMap.Add("itemId", itemId);
            paramsMap.Add("remainQty", remainQty.Replace(",", ""));
            paramsMap.Add("inLocationCd", inLocationCd);
            paramsMap.Add("outLocationCd", outLocationCd);
            paramsMap.Add("outsourcingFlag", outsourcingFlag);
            paramsMap.Add("createBy", clsStatic._USER_ID);
            paramsMap.Add("conversionUnit", conversionUnit);
            paramsMap.Add("conversionUnitQty", conversionUnitQty);
            paramsMap.Add("marketCd", marketCd);
            paramsMap.Add("currencyCd", currencyCd);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_giTemp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        /// <summary>
        /// MOM_POP_LABEL_GI_TMP 테이블 INSERT
        /// </summary>
        private void gi_label_tmp_insert(string move_id, string gikeycol, string toline, string matReqId)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID", move_id);
            paramsMap.Add("TRANSFER_FLAG", "WAIT");
            paramsMap.Add("GIKEYCOL", gikeycol);
            paramsMap.Add("TO_LOCATION_CD", toline);
            paramsMap.Add("MATERIAL_REQUEST_ID", matReqId);
            paramsMap.Add("CREATE_BY", clsStatic._USER_ID);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labelPopGiTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }
        
        /// <summary>
        /// 자재불출 처리 프로시저 호출
        /// </summary>
        private void material_gi(string move_id)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_move_id", move_id);
            paramsMap.Add("p_modifier", clsStatic._USER_ID);
            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable moveDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_mat_gi_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (moveDt == null)
            {
                frmMessage frm1 = new frmMessage("불출처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (moveDt.Rows.Count == 0)
            {
                frmMessage frm2 = new frmMessage("불출처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (moveDt.Rows[0]["p_err_code"].ToString() != "S")
            {
                frmMessage frm2 = new frmMessage(moveDt.Rows[0]["p_err_msg"].ToString(), "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }

            frmMessage frm3 = new frmMessage("불출처리가 정상적으로 처리었습니다.", "AUTOCLOSE");
            frm3.ShowDialog();
            txtSN_Focus();
            return;
        }

        /// <summary>
        /// Temp 데이터 삭제
        /// </summary>
        private void deleteTmp(string move_id)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_TMP_TYPE", "ISSUE");
            paramsMap.Add("P_TMP_ID", move_id);
            paramsList.Add(paramsMap);
            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.del_TmpData_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }
        #endregion


        #region 화면 상단 Control Event
        /// <summary>
        /// 일자 컨트롤 클릭
        /// </summary>
        private void lblNowdate_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmNowDate frm = new frmNowDate(lblNowdate.Text.Split(' ')[0]);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblNowdate.Text = clsStatic._dialogValue;

                clsStatic._dialogValue = "";
            }
        }

        /// <summary>
        /// 닫기 버튼 클릭
        /// </summary>
        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }
        #endregion

        #region 화면 하단 Control Event

        /// <summary>
        /// 수동수량 입력 버튼 클릭
        /// </summary>
        private void btnInput_Click(object sender, EventArgs e)
        {
            if (lblQty.Text.Trim() == "")
            {
                lblQty.Text = "0";
            }

            clsStatic._dialogValue = "";

            int selectedRow = grdMain.CurrentRow.Index;

            /*
             * if (grdMain["LABELYN", selectedRow].Value.ToString().Equals("Y"))
            {
                frmMessage frm1 = new frmMessage("간판라벨 관리 대상 품목은 수동수량입력 불가합니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }            
            */

            frmLoginIDInsert frm = new frmLoginIDInsert(lblQty.Text.Trim().Replace(",", ""));
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblQty.Text = double.Parse(clsStatic._dialogValue).ToString("###,###.##");

                int nownow = grdMain.CurrentRow.Index;

                double scanQty = double.Parse(clsStatic._dialogValue);
                double remainQty = double.Parse(grdMain["잔량", nownow].Value.ToString());

                if (remainQty <= scanQty)
                {
                    for (int i = 0; i < grdMain.Columns.Count; i++)
                    {
                        grdMain[i, nownow].Style.ForeColor = Color.Red;
                    }
                }
                else
                {
                    for (int i = 0; i < grdMain.Columns.Count; i++)
                    {
                        grdMain[i, nownow].Style.ForeColor = Color.Black;
                    }
                }

                grdMain["스캔수량", nownow].Value = double.Parse(clsStatic._dialogValue).ToString("###,###.##");

                clsStatic._dialogValue = "";
            }
        }

        /// <summary>
        /// 스캔리스트 버튼 클릭
        /// </summary>
        private void btnScanList_Click(object sender, EventArgs e)
        {
            frmScanView frm1 = new frmScanView(_scanDt, "불출");
            frm1.ShowDialog();
        }

        /// <summary>
        /// 간판라벨 발행(Split) 버튼 클릭
        /// </summary>
        private void btnManualPrint_Click(object sender, EventArgs e)
        {
            frmGanbanSplit frm = new frmGanbanSplit();
            frm.ShowDialog();
        }

        /// <summary>
        /// 화면 초기화 버튼 클릭
        /// </summary>
        private void btnPageInit_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("현재 화면을 초기화 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                txtSN.Text = "";
                lblItem.Text = "";
                lblQty.Text = "";
                grdMain.RemoveAll();
                newScanDt();

                txtSN_Focus();
            }
        }




        #endregion

        private void btnGanbanManual_Click(object sender, EventArgs e)
        {
            if (lblItem.Text == "")
            {
                frmGanbanManual frm3 = new frmGanbanManual(clsStatic._FROMLINE_DESC, clsStatic._FROMLINE);
                frm3.ShowDialog();
            }
            else
            {
                frmGanbanManual frm3 = new frmGanbanManual(clsStatic._FROMLINE_DESC, clsStatic._FROMLINE, lblItem.Text, lblQty.Text);
                frm3.ShowDialog();
            }
        }

        private void lblMessage_Click(object sender, EventArgs e)
        {

        }
    }
}
