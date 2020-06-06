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
using System.Globalization;

namespace SmartMOM_POP
{
    public partial class ucProductShipment : UserControl
    {
        string _sn = "";
        string _move_id = "";


        DataTable _gridDt = new DataTable();
        DataTable _scanDt = new DataTable();
        DataTable _poDt = new DataTable();
        DataTable _woDt = new DataTable();

        public ucProductShipment()
        {
            InitializeComponent();

            InitMainList();
            newScanDt();
        }

        #region Init Event

        //메인그리드
        private void InitMainList()
        {
            //                                   1.라벨ID  3.품목    4.품명      5.고객WO               6.고객주문번호   7.수량         스캔수량    8.납기일   2.업체명      9.바코드      
            string[] headerText = new string[] { "LabelId","ItemId", "ItemName", "CustomerWorkorderId", "CustomerPoNo", "DepartureQty", "ScanQty",  "DueDate", "VendorName", "Barcode",    "ShipmentGroupID" }; //
            string[] columnName = new string[] { "LABELID","ITEMID", "ITEMNAME", "PRODUCTORDERID",      "CUSTOMERPONO", "DEPARTUREQTY", "SCANQTY",  "DUEDATE", "VENDORNAME", "BARCODE",    "SHIPMENTGROUPID" };
            string[] columnType = new string[] { "T",      "T",      "T",        "T",                   "T",            "T",            "T",        "T",       "T",          "T",          "T"               };
                                                                                                                                                                            
            int[] columnWidth = new int[]      { 100,      170,      200,        170,                   170,            90,             90,         90,        120,          50,           50                };
            bool[] columnVisible = new bool[]  { false,    true,     true,       true,                  true,           true,           true,       true,      true,         false,        false             };
            bool[] columnDisable = new bool[]  { true,     true,     true,       true,                  true,           true,           true,       true,      true,         true,         true              };
            string[] cellAlign = new string[]  { "C",      "L",      "L",        "C",                   "C",            "R",            "R",        "C",       "L",          "L",          "L"               };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 50;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }


        //스캔리스트
        private void newScanDt()
        {
            _scanDt.Dispose();
            _scanDt = new DataTable();

            _scanDt.Columns.Add("GANBANID");
            _scanDt.Columns.Add("SCANQTY");
            _scanDt.Columns.Add("TYPE");
        }

        #endregion

        //화면 초기화
        private void btnInit_Click(object sender, EventArgs e)
        {
            //화면을 초기화 하시겠습니까?
            frmMessage frm = new frmMessage("Do you want to reset the screen?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                init();
            }
        }

        public void init()
        {
            grdMain.RemoveAll();
            _gridDt.Clear();
            newScanDt();
            lblShipGrpID.Text = "";
            txtSN.Text = "";
        }

        #region 그리드 Event

        //특성 Row 색 변경
        private void grdMain_Color_change()
        {
            if(grdMain.Rows.Count <= 0 )
            {
                return;
            }

            double currentqty = 0;
            double scanqty = 0;
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                currentqty = double.Parse(grdMain["DepartureQty", i].Value.ToString());
                scanqty = double.Parse(grdMain["ScanQty", i].Value.ToString());

                if (scanqty == currentqty)
                {
                    for (int j = 0; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Red;
                    }
                }
                else
                {
                    for (int j = 0; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Black;
                    }
                }

                grdMain["ScanQty", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold | FontStyle.Underline);
                grdMain["ScanQty", i].Style.BackColor = Color.DodgerBlue;
            }
        }


        #endregion

        #region 라벨 스캔 Event

        //바코드 입력
        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (clsStatic._FROMLINE == "")
                {
                    //창고가 선택되지 않았습니다.
                    frmMessage frm = new frmMessage("No warehouse is selected.", "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }

                if (txtSN.Text.Trim() == "")
                {
                    txtSN_Focus();
                    return;
                }

                //if (txtSN.Text.Substring(0,1) == "S")
                if(lblShipGrpID.Text == "")
                {
                    get_shipment_plan(txtSN.Text.Trim());
                    newScanDt();
                }
                else
                {
                    get_shipmentLabel_info(); 
                }

                txtSN_Focus();
            }
        }

        //출하계획서 조회
        private void get_shipment_plan(string ganban)
        {

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("LOCATION_CD", clsStatic._FROMLINE);
            paramsMap.Add("LABEL_ID", ganban);

            paramsList.Add(paramsMap);

            string retvalue = "";

            _gridDt.Dispose();
            _gridDt = new DataTable();
            _gridDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_shipmentPlanInfo.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (_gridDt == null)
            {
                //존재하지 않는 출하계획 입니다.
                frmMessage frm = new frmMessage("The shipment plan does not exist.", "AUTOCLOSE");
                frm.ShowDialog();

                txtSN_Focus();
                return;
            }

            if (_gridDt.Rows.Count == 0)
            {
                //존재하지 않는 출하계획 입니다.
                frmMessage frm = new frmMessage("The shipment plan does not exist.", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            lblShipGrpID.Text = ganban;
            grdMain.RemoveAll();
            grdMain.DataBindDataSource(_gridDt, false, false);

            txtSN_Focus();
        }

        //출하라벨 조회
        private void get_shipmentLabel_info()
        {
            string ganban = "";
            ganban = txtSN.Text.Trim();

            DataTable searchDt = new DataTable();  
            
            //LG 출하라벨 조회
            if(ganban.Substring(0, 3).Equals("SHK"))
            {
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("LOCATION_CD", clsStatic._FROMLINE);
                paramsMap.Add("LABEL_ID", ganban);

                paramsList.Add(paramsMap);

                string retvalue = "";

                searchDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_LGEshipmentInfo.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }
            //희성 출하라벨 조회
            else if(ganban.Substring(0, 1).Equals("C"))
            {
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("LOCATION_CD", clsStatic._TOLINE);
                paramsMap.Add("LABEL_ID", ganban);

                paramsList.Add(paramsMap);

                string retvalue = "";

                searchDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_HSEshipmentInfo.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }

            if (searchDt == null)
            {
                //입력한 라벨이 존재하지 않거나 사용 불가 처리 된 라벨 입니다.
                frmMessage frm = new frmMessage("The label entered does not exist or has been disabled.", "AUTOCLOSE");
                frm.ShowDialog();                
                txtSN_Focus();
                return;
            }

            if (searchDt.Rows.Count == 0)
            {
                //입력한 라벨이 존재하지 않거나 사용 불가 처리 된 라벨 입니다.
                frmMessage frm = new frmMessage("The label entered does not exist or has been disabled.", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            
            DataRow[] drs = _scanDt.Select("GANBANID = '" + ganban + "'");

            if (drs.Length > 0)
            {
                //이미 입력한 간판라벨입니다.
                frmMessage frm1 = new frmMessage("This label has already been entered.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }


            string dtItem_id = "";
            string scanDtInsertFlag = "NO";

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                double planQty = 0;
                double scanQty = 0;

                //LGE 출하 라벨 일 때 동일한 바코드 정보 가진 출하계획 찾기
                if (ganban.Substring(0, 3).Equals("SHK"))
                {
                    string barcode = grdMain["Barcode", i].Value.ToString();

                    if(barcode == searchDt.Rows[0]["BARCODE"].ToString())
                    {
                        scanQty = double.Parse(searchDt.Rows[0]["SHIPQTY"].ToString().Trim());
                        planQty = double.Parse(grdMain["DepartureQty", i].Value.ToString().Trim());

                        if (planQty != scanQty + double.Parse(grdMain["ScanQty", i].Value.ToString().Trim()))
                        {
                            //스캔한 수량이 출하계획 수량과 일치하지 않습니다.
                            frmMessage frm1 = new frmMessage("Scanned qty does not match shipment plan qty.", "AUTOCLOSE");
                            frm1.ShowDialog();
                            txtSN_Focus();
                            return;
                        }
                        else if (planQty == scanQty + double.Parse(grdMain["ScanQty", i].Value.ToString().Trim()))
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

                        grdMain["ScanQty", i].Value = (double.Parse(grdMain["ScanQty", i].Value.ToString().Trim()) + scanQty).ToString("######.##");
                        scanDtInsertFlag = "OK";
                    }
                }
                //HSE 출하 라벨 일 때 동일한 고객주문번호와 품목번호로 찾기
                else
                {
                    string customerWo = grdMain["CustomerWorkorderId", i].Value.ToString();
                    string itemId = grdMain["ItemId", i].Value.ToString();

                    if (customerWo == searchDt.Rows[0]["CUSTOMERPOID "].ToString()
                    &&  itemId == searchDt.Rows[0]["ITEMID "].ToString())
                    {
                        scanQty = double.Parse(searchDt.Rows[0]["SHIPQTY"].ToString().Trim());
                        planQty = double.Parse(grdMain["DepartureQty", i].Value.ToString().Trim());

                        if (planQty < scanQty + double.Parse(grdMain["ScanQty", i].Value.ToString().Trim()))
                        {
                            //스캔한 수량이 출하계획 수량보다 많습니다.
                            frmMessage frm1 = new frmMessage("Scanned qty is more than shipment plan qty.", "AUTOCLOSE");
                            frm1.ShowDialog();
                            txtSN_Focus();
                            return;
                        }
                        else if (planQty == scanQty + double.Parse(grdMain["ScanQty", i].Value.ToString().Trim()))
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

                        grdMain["ScanQty", i].Value = (double.Parse(grdMain["ScanQty", i].Value.ToString().Trim()) + scanQty).ToString("######.##");
                        scanDtInsertFlag = "OK";
                    }
                }
                
            }

            if (scanDtInsertFlag == "OK"&& ganban.Substring(0, 1).Equals("C"))
            {
                _scanDt.Rows.Add(ganban, searchDt.Rows[0]["SHIPQTY"].ToString(), ganban.Substring(0, 1));
            }

            if (scanDtInsertFlag != "OK")
            {
                //해당 하는 출하계획이 없습니다.
                frmMessage frm = new frmMessage("There is no corresponding shipping plan.", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }
        }

        //바코드 입력창 포커싱
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



        #endregion

        #region 출하 처리

        //출하버튼 클릭
        private void btnShipment_Click(object sender, EventArgs e)
        {
            if (grdMain.Rows.Count <= 0)
            {
                //출하처리 대상이 없습니다.
                frmMessage frm1 = new frmMessage("The shipping target does not exist.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                double scanQty = double.Parse(grdMain["ScanQty", i].Value.ToString().Trim());
                double planQty = double.Parse(grdMain["DepartureQty", i].Value.ToString().Trim());

                if (planQty == scanQty || scanQty == 0)
                {
                    continue;
                }
                else
                {
                    //스캔수량은 출발처리수량과 일치해야 합니다.
                    frmMessage frm1 = new frmMessage("Scan qty should match the Departure qty.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }
            }

            //입력한 품목들을 출하처리 하시겠습니까?
            frmMessage frm = new frmMessage("Do you want to shipping process the items you entered?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                string retbuf = "";
                retbuf = get_moveSeq();

                if (retbuf == "NG")
                {
                    //현재 출하처리가 진행중입니다. 잠시후 진행 하여 주세요.
                    frmMessage frm1 = new frmMessage("Shipment processing is currently in progress. Please try again later.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                string moveId = retbuf;

                try
                {
                    for (int i = 0; i < grdMain.Rows.Count; i++)
                    {
                        double scanQty = double.Parse(grdMain["ScanQty", i].Value.ToString().Trim());
                        double planQty = double.Parse(grdMain["DepartureQty", i].Value.ToString().Trim());

                        if (scanQty == planQty)
                        {
                            move_item_tmp_insert(moveId, grdMain["Barcode", i].Value.ToString(), grdMain["ShipmentGroupID", i].Value.ToString());
                        }
                    }

                    for (int i = 0; i < _scanDt.Rows.Count; i++)
                    {
                        string ganban = _scanDt.Rows[i]["GANBANID"].ToString().Trim();
                        move_label_tmp_insert(moveId, ganban);
                    }

                    shipment_process(moveId);

                }
                catch(Exception ex)
                {
                    deleteTmp(moveId); 
                    //출하처리가 실패하였습니다. 잠시후 진행 하여 주세요.
                    frmMessage frm1 = new frmMessage("Shipment processing failed. Please try again later.", "AUTOCLOSE");
                    frm1.ShowDialog();
                }
            }
        }


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

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_shipmentMoveseqCheck.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                return "NG";
            }

            if (checkDt.Rows.Count <= 0)
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

        private void move_label_tmp_insert(string move_id, string ganban)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID", move_id);
            paramsMap.Add("TRANSFER_FLAG", "WAIT");
            paramsMap.Add("GANBAN_ID", ganban);
            paramsMap.Add("LOCATION_CD", clsStatic._FROMLINE);
            paramsMap.Add("CREATE_BY", clsStatic._USER_ID);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable shipDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_PopShipLabelTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void move_item_tmp_insert(string move_id, string barcode, string ghipGrpId)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID", move_id);
            paramsMap.Add("TRANSFER_FLAG", "WAIT");
            paramsMap.Add("BARCODE", barcode);
            paramsMap.Add("LOCATION_CD", clsStatic._FROMLINE);
            paramsMap.Add("CREATE_BY", clsStatic._USER_ID);
            paramsMap.Add("SHIPMENT_GROUP_ID", ghipGrpId);

            paramsList.Add(paramsMap);

            string retvalue = "";
            DataTable shipDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_PopShipTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

        }

        private void shipment_process(string move_id)
        {
            try
            {
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("p_err_msg", "");
                paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
                paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
                paramsMap.Add("p_location_cd", clsStatic._FROMLINE);
                paramsMap.Add("p_move_id", move_id);
                paramsMap.Add("p_modifier", clsStatic._USER_ID);
                paramsList.Add(paramsMap);
                string retvalue = "";
                DataTable moveDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.set_shipping_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                if (moveDt == null)
                {
                    //출하처리가 정상적으로 처리되지 않았습니다.
                    frmMessage frm1 = new frmMessage("Shipment processing did not process successfully.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                if (moveDt.Rows.Count == 0)
                {
                    //출하처리가 정상적으로 처리되지 않았습니다.
                    frmMessage frm2 = new frmMessage("Shipment processing did not process successfully.", "AUTOCLOSE");
                    frm2.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                //출하처리가 정상적으로 처리었습니다.
                frmMessage frm3 = new frmMessage("The shipment processing was successful.", "AUTOCLOSE");
                frm3.ShowDialog();

                deleteTmp(move_id);
                grdMain.RemoveAll();
                get_shipment_plan(lblShipGrpID.Text);
                txtSN_Focus();
            }
            catch (Exception e)
            {
                throw new Exception();
            }
        }

        //Temp 데이터 삭제
        private void deleteTmp(string move_id)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_TMP_TYPE", "SHIPMENT");
            paramsMap.Add("P_TMP_ID", move_id);
            paramsList.Add(paramsMap);
            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.del_TmpData_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }



        #endregion

        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }

        
    }
}
