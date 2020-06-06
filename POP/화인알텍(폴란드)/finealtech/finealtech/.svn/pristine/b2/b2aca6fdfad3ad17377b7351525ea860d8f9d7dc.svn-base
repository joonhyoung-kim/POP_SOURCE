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
    public partial class ucProductMove : UserControl
    {
        string _sn = "";
        string _move_id = "";


        DataTable _gridDt = new DataTable();
        DataTable _scanDt = new DataTable();
        DataTable _poDt = new DataTable();
        DataTable _woDt = new DataTable();

        public ucProductMove()
        {
            InitializeComponent();

            InitMainList();
            InitScanList();

        }

        #region Init Event

        //메인그리드
        private void InitMainList()
        {
            //                                   1.품목    2.품명      3.품목타입명    4.현재고      5.스캔수량  6.단위    7.규격           8.유무상구분     9.비고
            string[] headerText = new string[] { "ItemId", "ItemName", "ItemTypeName", "CurrentQty", "ScanQty",  "UnitCd", "Specification", "FreeOfferName", "Description" }; //9
            string[] columnName = new string[] { "ITEMID", "ITEMNAME", "ITEMTYPENAME", "CURRENTQTY", "SCANQTY",  "UNIT",   "SPECIFICATION", "FREEOFFERNAME", "DESCRIPTION" };
            string[] columnType = new string[] { "T",      "T",        "T",            "T",          "T",        "T",      "T",             "T",             "T" };
                                                                                                                           
            int[] columnWidth = new int[]      { 165,      333,        90,             90,           90,         90,       90,              90,              255 };
            bool[] columnVisible = new bool[]  { true,     true,       true,           true,         true,       true,     true,            true,            true };
            bool[] columnDisable = new bool[]  { true,     true,       true,           true,         true,       true,     true,            true,            true };
            string[] cellAlign = new string[]  { "L",      "L",        "C",            "R",          "R",        "C",      "L",             "C",             "C" };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 50;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void InitScanList()
        {
            //                                   0.라벨타입   1.바코드(스캔)  2.스캔수량(SN기준)               
            string[] headerText = new string[] { "LabelType", "Barcode",      "ScanQty" }; //3
            string[] columnName = new string[] { "LABELTYPE", "BARCODE",      "SCANQTY" };
            string[] columnType = new string[] { "T",         "T",            "T" };

            int[] columnWidth = new int[]      { 100,          150,           100 };
            bool[] columnVisible = new bool[]  { true,         true,          true };
            bool[] columnDisable = new bool[]  { true,         true,          true };
            string[] cellAlign = new string[]  { "C",          "C",           "C" };

            grdScan.SetBorderAndGridlineStyles();
            grdScan.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdScan.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdScan.RowTemplate.Height = 50;

            grdScan.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdScan.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        //스캔리스트
        private void newScanDt()
        {
            _scanDt.Dispose();
            _scanDt = new DataTable();

            _scanDt.Columns.Add("GANBANID");
            _scanDt.Columns.Add("SCANQTY");
            _scanDt.Columns.Add("TOLINE");
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

            txtSN_Focus();
        }

        public void init()
        {
            grdMain.RemoveAll();
            grdScan.RemoveAll();
            _gridDt.Clear();
            txtSN.Text = "";
            lblItem.Text = "";
            lblQty.Text = "";
        }


        #region 하단 Condition 영역 Event

        //수동수량입력 클릭
        private void btnInput_Click(object sender, EventArgs e)
        {
            if (lblQty.Text.Trim() == "")
            {
                lblQty.Text = "0";
            }

            clsStatic._dialogValue = "";

            frmLoginIDInsertDouble frm = new frmLoginIDInsertDouble(lblQty.Text.Trim());
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblQty.Text = double.Parse(clsStatic._dialogValue).ToString("######.##");

                grdMain["ScanQty", grdMain.CurrentRow.Index].Value = (double.Parse(grdMain["ScanQty", grdMain.CurrentRow.Index].Value.ToString()) + double.Parse(clsStatic._dialogValue)).ToString("######.##");

                clsStatic._dialogValue = "";
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
                lblItem.Text = grdMain["ItemId", nownow].Value.ToString();
                lblQty.Text = grdMain["ScanQty", nownow].Value.ToString().Trim();
            }
        }

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
                currentqty = double.Parse(grdMain["CurrentQty", i].Value.ToString());
                scanqty = double.Parse(grdMain["ScanQty", i].Value.ToString());

                if (scanqty >= currentqty)
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
            }
        }





        #endregion

        #region 라벨 스캔 Event

        //바코드 입력
        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (clsStatic._FROMLINE == "" || clsStatic._TOLINE == "")
                {
                    //From, To 창고가 선택되지 않았습니다.
                    frmMessage frm = new frmMessage("From, To warehouse is not selected.", "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }

                if (clsStatic._FROMLINE == clsStatic._TOLINE)
                {
                    //From 창고와 To 창고를 다르게 선택해주십시오.
                    frmMessage frm = new frmMessage("Please select a different From warehouse and To warehouse.", "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }

                if (txtSN.Text.Trim() == "")
                {
                    txtSN_Focus();
                    return;
                }
                else
                {
                    moveProduct_main();
                }
                txtSN_Focus();
            }
        }

        private void moveProduct_main()
        {
            if (txtSN.Text.Trim() == "")
            {
                txtSN_Focus();
                return;
            }
            string labeltype = txtSN.Text.Trim().Substring(0, 1);
            string sn = "";
            string ct = "";
            string palletid = "";
            string item_id = "";
            _sn = txtSN.Text.Trim();
            if (txtSN.Text.Trim().Length == 8)
            {
                if (labeltype == "G")
                {
                    labeltype = "SN";
                    sn = txtSN.Text.Trim();
                    ct = "";
                    palletid = "";
                    item_id = "";
                }
                else if (labeltype == "C")
                {
                    labeltype = "CT";
                    sn = "";
                    ct = txtSN.Text.Trim();
                    palletid = "";
                    item_id = "";
                }

                else if (labeltype == "P")
                {
                    labeltype = "PALLET";
                    sn = "";
                    ct = "";
                    palletid = txtSN.Text.Trim();
                    item_id = "";
                }
                else if (labeltype == "K")
                {
                    labeltype = "GANBAN";
                    string retvalue = "";

                    sn = "";
                    ct = "";
                    palletid = "";
                }
            }
            else if (txtSN.Text.Trim().Length > 8)
            {
                labeltype = "CT";
                sn = "";
                ct = txtSN.Text.Trim().Substring(txtSN.Text.Trim().Length - 8, 8);
                txtSN.Text = ct;
                _sn = ct;
                palletid = "";
                item_id = "";
            }
            else
            {
                labeltype = "ITEM";
                sn = "";
                ct = "";
                palletid = "";
                item_id = txtSN.Text.Trim();
            }
            if (labeltype != "ITEM")
            {
                scan_search(sn, ct, palletid, labeltype);
                grdMain_Color_change();
            }

            txtSN_Focus();
        }

        private void scan_search(string sn, string ct, string palletid, string labeltype)
        {
            string retvalue = "";
            string itemtype = "";

            if (clsStatic._ITEMTYPE != "ALL")
            {
                itemtype = clsStatic._ITEMTYPE;
            }

            /*
            if (sn == "" && ct != "" && palletid == "")
            {
                List<Dictionary<string, object>> paramsCTList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsCTMap = new Dictionary<string, object>();
                paramsCTMap.Add("p_err_code", "");
                paramsCTMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsCTMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsCTMap.Add("CT", ct);

                paramsCTList.Add(paramsCTMap);

                DataTable ctDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ctganbancheck.dummy", paramsCTList, clsStatic._serviceSelectURL, ref retvalue);

                if (int.Parse(ctDt.Rows[0]["CTCOUNT"].ToString().Trim()) > 0)
                {
                    frmMessage frm = new frmMessage("입력한 박스포장라벨(" + ct + ")는 간판라벨이 발행되어 있어 공정재고 이동이 불가능합니다.", "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }
            }
            */

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            DataTable dt = new DataTable();

            if (labeltype == "GANBAN")
            {
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("GANBAN_ID", txtSN.Text.Trim());
                paramsMap.Add("SLOC", clsStatic._FROMLINE);

                paramsList.Add(paramsMap);

                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganbanStockMoveQTY.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }
            else
            {
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("FROM_LOC", clsStatic._FROMLINE);
                paramsMap.Add("SN", sn);
                paramsMap.Add("CT", ct);
                paramsMap.Add("PALLETID", palletid);

                paramsList.Add(paramsMap);

                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_itemStockMove_snctptQTY.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }

            if (dt == null)
            {
                //현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않거나 비사용 처리된 라벨입니다.. 라벨정보를 확인하여 주세요!
                frmMessage frm = new frmMessage("This product is not currently in storage(" + clsStatic._FROMLINE_DESC + ") or is not in use.. Please check the label information!", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (dt.Rows.Count <= 0)
            {
                //현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않거나 비사용 처리된 라벨입니다.. 라벨정보를 확인하여 주세요!
                frmMessage frm = new frmMessage("This product is not currently in storage(" + clsStatic._FROMLINE_DESC + ") or is not in use.. Please check the label information!", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            string checkbuf = "NO";
            string qtybuf = "0";
            if (dt.Rows[0]["SCANQTY"].ToString().Trim() == "")
            {
                qtybuf = "0";
            }
            else
            {
                qtybuf = double.Parse(dt.Rows[0]["SCANQTY"].ToString()).ToString("######.##");
            }

            
            for (int i = 0; i < grdScan.Rows.Count; i++)
            {
                string gridbuf = grdScan.Rows[i].Cells["Barcode"].Value.ToString();

                if (_sn == gridbuf)
                {
                    checkbuf = "OK";
                    //이미 스캔한 라벨입니다.
                    frmMessage frm1 = new frmMessage("This label has already been scanned.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }
            }

            if (checkbuf == "NO")
            {
                grdScan.Rows.Add();
                int nownow = grdScan.Rows.Count - 1;

                grdScan["LabelType", nownow].Value = labeltype;
                grdScan["Barcode", nownow].Value = _sn;
                grdScan["ScanQty", nownow].Value = qtybuf;

                string itemid = dt.Rows[0]["itemid"].ToString();

                search_process(itemid, qtybuf);
            }
            
        }

        private void search_process(string item_id, string qtybuf)
        {
            string retvalue = "";
            string itemtype = "";


            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string gridbuf = grdMain.Rows[i].Cells["ItemId"].Value.ToString();

                if (item_id == gridbuf)
                {
                    grdMain["ScanQty", i].Value = (double.Parse(grdMain["ScanQty", i].Value.ToString()) + double.Parse(qtybuf)).ToString("######.##");
                    return;
                }
            }


            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("stockType", clsStatic._STOCK_TYPE);
            paramsMap.Add("location", clsStatic._FROMLINE);
            paramsMap.Add("itemType", "");
            paramsMap.Add("itemId", item_id);
            paramsMap.Add("zeroFlag", "");

            paramsList.Add(paramsMap);

            DataTable stockDt = clsUtil.GetServiceData("com.thirautech.mom.purchase.stock.materialMove.get_materialMove_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            if (stockDt == null)
            {
                return;
            }

            if (stockDt.Rows.Count <= 0)
            {
                return;
            }

            grdMain.Rows.Add();
            int nownow = grdMain.Rows.Count - 1;

            grdMain["ItemId", nownow].Value = stockDt.Rows[0]["ITEMID"].ToString();
            grdMain["ItemName", nownow].Value = stockDt.Rows[0]["ITEMNAME"].ToString();
            grdMain["ItemTypeName", nownow].Value = stockDt.Rows[0]["ITEMTYPENAME"].ToString();
            grdMain["CurrentQty", nownow].Value = stockDt.Rows[0]["CURRENTQTY"].ToString();
            grdMain["ScanQty", nownow].Value = qtybuf;
            grdMain["UnitCd", nownow].Value = stockDt.Rows[0]["UNIT"].ToString();
            grdMain["Specification", nownow].Value = stockDt.Rows[0]["SPECIFICATION"].ToString();
            grdMain["FreeOfferName", nownow].Value = stockDt.Rows[0]["FREEOFFERNAME"].ToString();
            grdMain["Description", nownow].Value = stockDt.Rows[0]["DESCRIPTION"].ToString();
        }

        //바코드 입력창 포커싱
        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Text = "";
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

        #region 이동/반납 처리

        //이동 처리
        private void btnMove_Click(object sender, EventArgs e)
        {
            if (grdMain.Rows.Count <= 0)
            {
                txtSN_Focus();
                return;
            }

            //입력한 품목들을 이동처리 하시겠습니까?
            frmMessage frm = new frmMessage("Do you want to move the entered item?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.Cancel)
            {
                txtSN_Focus();
                return;
            }

            string retbuf = "";
            retbuf = get_moveSeq();

            if (retbuf == "NG")
            {
                //현재 이동처리가 진행중입니다. 잠시후 이동처리 진행 하여 주세요.
                frmMessage frm1 = new frmMessage("Processing is currently in progress. Please try again later.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            _move_id = retbuf;

            string desc = "POP 공정이동";

            for (int i = 0; i < grdScan.Rows.Count; i++)
            {
                string movekeycol = grdScan["Barcode", i].Value.ToString();

                move_label_tmp_insert(_move_id, movekeycol);
            }

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string item_id = grdMain["ItemId", i].Value.ToString();
                double qty = double.Parse(grdMain["ScanQty", i].Value.ToString());

                move_item_tmp_insert(_move_id, item_id, qty, desc);
            }

            move_transfer(_move_id);
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

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getMoveseqCheck.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

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

        private void move_label_tmp_insert(string move_id, string movekeycol)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID", move_id);
            paramsMap.Add("TO_LOCATION_CD", clsStatic._TOLINE);
            paramsMap.Add("TRANSFER_FLAG", "WAIT");
            paramsMap.Add("MOVEKEYCOL", movekeycol);
            paramsMap.Add("CREATE_BY", clsStatic._USER_ID);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labelPopMoveTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void move_item_tmp_insert(string move_id, string item_id, double qty, string desc)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID", move_id);
            paramsMap.Add("TRANSFER_FLAG", "WAIT");
            paramsMap.Add("ITEM_ID", item_id);
            paramsMap.Add("QTY", qty);
            paramsMap.Add("FROM_LOCATION_CD", clsStatic._FROMLINE);
            paramsMap.Add("TO_LOCATION_CD", clsStatic._TOLINE);
            paramsMap.Add("STOCK_TYPE", clsStatic._STOCK_TYPE);
            paramsMap.Add("DESCRIPTION", desc);
            paramsMap.Add("CREATE_BY", clsStatic._USER_ID);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_itemPopMoveTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void move_transfer(string move_id)
        {
            try
            {
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("p_err_msg", "");
                paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("P_STOCK_TYPE", clsStatic._STOCK_TYPE);
                paramsMap.Add("P_MOVE_ID", move_id);
                paramsMap.Add("TO_LOCATION_CD", clsStatic._TOLINE);
                paramsMap.Add("P_MODIFIER", clsStatic._USER_ID);
                paramsList.Add(paramsMap);
                string retvalue = "";
                DataTable moveDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_move_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                if (moveDt == null)
                {
                    //이동처리가 정상적으로 처리되지 않았습니다.
                    frmMessage frm1 = new frmMessage("Move processing did not process successfully.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                if (moveDt.Rows.Count == 0)
                {
                    //이동처리가 정상적으로 처리되지 않았습니다.
                    frmMessage frm2 = new frmMessage("Move processing did not process successfully.", "AUTOCLOSE");
                    frm2.ShowDialog();
                    txtSN_Focus();
                    return;
                }
                //이동처리가 정상적으로 처리었습니다.
                frmMessage frm3 = new frmMessage("The move processing was successful.", "AUTOCLOSE");
                frm3.ShowDialog();
                grdMain.RemoveAll();
                grdScan.RemoveAll();
                txtSN_Focus();
            }
            catch (Exception e)
            {
                frmMessage frm = new frmMessage(e.Message, "AUTOCLOSE");
                frm.ShowDialog();
                deleteTmp(move_id);
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
            paramsMap.Add("P_TMP_TYPE", "MOVE");
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
