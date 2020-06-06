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

namespace SmartMOM_POP
{
    public partial class ucMoveProductItemAction : UserControl
    {
        string _sn = "";
        string _move_id = "";
        string _palletid = "";
        string _productorderid = "";

        public ucMoveProductItemAction(string palletid, string productorderid)
        {
            InitializeComponent();

            InitScanList();
            InitMainList();

            if(palletid.Trim() != "")
            {
                txtSN.Text = palletid;
                _palletid = palletid;
                _productorderid = productorderid;
                moveProduct_main();
            }
        }

        private void InitScanList()
        {
            //                                   0             1                2               
            string[] headerText  = new string[] { "라벨타입",  "바코드(스캔)", "스캔수량(SN기준)" }; //3
            string[] columnName  = new string[] { "LABELTYPE", "BARCODE",      "SCANQTY"          };
            string[] columnType  = new string[] { "T",         "T",            "T"                };
                                                                                                
            int[] columnWidth    = new int[]    { 100,         150,            100                };
            bool[] columnVisible = new bool[]   { true,        true,           true               };
            bool[] columnDisable = new bool[]   { true,        true,           true               };
            string[] cellAlign   = new string[] { "C",        "C",             "C"                };

            grdScan.SetBorderAndGridlineStyles();
            grdScan.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdScan.DefaultCellStyle.Font = new Font("맑은고딕", 20, FontStyle.Bold);
            grdScan.RowTemplate.Height = 80;

            grdScan.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 20F, FontStyle.Bold);
            grdScan.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void InitMainList()
        {
            //                                   0         1           2               3             4             5        6                7                8             
            string[] headerText = new string[] { "품목",   "품명",     "품목타입명",   "현재고",     "스캔수량",   "단위",  "규격",          "유무상구분",    "비고"          }; //9
            string[] columnName = new string[] { "ITEMID", "ITEMNAME", "ITEMTYPENAME", "CURRENTQTY", "SCANQTY",    "UNIT",  "SPECIFICATION", "FREEOFFERNAME", "DESCRIPTION"   };
            string[] columnType = new string[] {  "T",     "T",        "T",            "T",          "T",          "T",     "T",             "T",             "T"             };
                                                                                                                                                     
            int[] columnWidth    = new int[]   {  370,      300,       90,            90,           90,           90,       90,              90,            255              };
            bool[] columnVisible = new bool[]  {  true,     true,      true,           true,         true,         true,    true,             true,           true            };
            bool[] columnDisable = new bool[]  {  true,     true,      true,           true,         true,         true,    true,             true,           true            };
            string[] cellAlign = new string[]  { "L",       "L",       "C",            "R",          "R",          "C",     "L",              "C",            "C"             };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 20, FontStyle.Bold);
            grdMain.RowTemplate.Height = 80;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 20F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
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

        private void search_process(string item_id, string qtybuf)
        {
            string retvalue = "";
            string itemtype = "";


            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string gridbuf = grdMain.Rows[i].Cells["품목"].Value.ToString();

                if (item_id == gridbuf)
                {
                    grdMain["스캔수량", i].Value = (int.Parse(grdMain["스캔수량", i].Value.ToString().Replace(",", "")) + int.Parse(qtybuf.Replace(",", ""))).ToString("###,##0");
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

            grdMain["품목",       nownow].Value = stockDt.Rows[0]["ITEMID"].ToString();
            grdMain["품명",       nownow].Value = stockDt.Rows[0]["ITEMNAME"].ToString();
            grdMain["품목타입명", nownow].Value = stockDt.Rows[0]["ITEMTYPENAME"].ToString();
            grdMain["현재고",     nownow].Value = stockDt.Rows[0]["CURRENTQTY"].ToString();
            grdMain["스캔수량",   nownow].Value = qtybuf.Replace(",", "");
            grdMain["단위",       nownow].Value = stockDt.Rows[0]["UNIT"].ToString();
            grdMain["규격",       nownow].Value = stockDt.Rows[0]["SPECIFICATION"].ToString();
            grdMain["유무상구분", nownow].Value = stockDt.Rows[0]["FREEOFFERNAME"].ToString();
            grdMain["비고",       nownow].Value = stockDt.Rows[0]["DESCRIPTION"].ToString();
        }

        /*
        private void search_process(string sn, string ct, string palletid, string qtybuf, string itemid)
        {
            string retvalue = "";
            string itemtype = "";

            if (clsStatic._ITEMTYPE != "ALL")
            {
                itemtype = clsStatic._ITEMTYPE;
            }


            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("FROM_LOC", clsStatic._FROMLINE);
            paramsMap.Add("SN", sn);
            paramsMap.Add("CT", ct);
            paramsMap.Add("PALLETID", palletid);
            paramsMap.Add("ITEM_ID", itemid);
            paramsMap.Add("ITEMTYPE", itemtype);

            paramsList.Add(paramsMap);

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_itemStockMove_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt == null)
            {
                return;
            }

            if (dt.Rows.Count <= 0)
            {
                return;
            }

            string checkbuf = "NO";
            string itemidtmp = dt.Rows[0]["ITEMID"].ToString().Trim();

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string gridbuf = grdMain.Rows[i].Cells["품목"].Value.ToString();

                if (itemid == gridbuf)
                {
                    checkbuf = "OK";

                    grdMain["스캔수량", i].Value = (int.Parse(grdMain["스캔수량", i].Value.ToString().Replace(",", "")) + int.Parse(qtybuf.Replace(",", ""))).ToString("###,##0");
                    return;
                }
            }
            if(checkbuf == "NO")
            {
                grdMain.Rows.Add();
                int nownow = grdMain.Rows.Count - 1;

                grdMain["품목",       nownow].Value = dt.Rows[0]["ITEMID"].ToString();
                grdMain["품명",       nownow].Value = dt.Rows[0]["ITEMNAME"].ToString();
                grdMain["품목타입명", nownow].Value = dt.Rows[0]["ITEMTYPENAME"].ToString();
                grdMain["현재고",     nownow].Value = dt.Rows[0]["CURRENTQTY"].ToString();
                grdMain["스캔수량",   nownow].Value = qtybuf.Replace(",", "");
                grdMain["단위",       nownow].Value = dt.Rows[0]["UNIT"].ToString();
                grdMain["규격",       nownow].Value = dt.Rows[0]["SPECIFICATION"].ToString();
                grdMain["유무상구분", nownow].Value = dt.Rows[0]["FREEOFFERNAME"].ToString();
                grdMain["비고",       nownow].Value = dt.Rows[0]["DESCRIPTION"].ToString();
            }

        }
        */


        private void grdMain_Color_change()
        {
            int currentqty = 0;
            int scanqty = 0;
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                currentqty = int.Parse(grdMain["현재고", i].Value.ToString().Replace(",", ""));
                scanqty = int.Parse(grdMain["스캔수량", i].Value.ToString().Replace(",", ""));

                if (scanqty >= currentqty)
                {
                    for (int j = 0; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Black;
                    }
                }
                else
                {
                    for (int j = 0; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Red;
                    }
                }
            }
        }


        private void scan_search(string sn, string ct, string palletid, string labeltype)
        {
            string retvalue = "";
            string itemtype = "";

            if (clsStatic._ITEMTYPE != "ALL")
            {
                itemtype = clsStatic._ITEMTYPE;
            }

            if(sn == "" && ct != "" && palletid == "")
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

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            DataTable dt = new DataTable();
            if (labeltype == "GANBAN")
            {
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD",  clsStatic._COMPANY_CD);
                paramsMap.Add("GANBAN_ID",   txtSN.Text.Trim());
                paramsMap.Add("SLOC",        clsStatic._FROMLINE);

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
                frmMessage frm = new frmMessage("현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않거나 비사용 처리된 라벨입니다.. 라벨정보를 확인하여 주세요!", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (dt.Rows.Count <= 0)
            {
                frmMessage frm = new frmMessage("현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않거나 비사용 처리된 라벨입니다.. 라벨정보를 확인하여 주세요!", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            string checkbuf = "NO";
            string qtybuf = dt.Rows[0]["SCANQTY"].ToString().Trim();
            if (qtybuf == "")
            {
                qtybuf = "0";
            }
            else
            {
                qtybuf = int.Parse(qtybuf.ToString()).ToString("###,##0");
            }
            for (int i = 0; i < grdScan.Rows.Count; i++)
            {
                string gridbuf = grdScan.Rows[i].Cells["바코드(스캔)"].Value.ToString();

                if (_sn == gridbuf)
                {
                    checkbuf = "OK";

                    frmMessage frm1 = new frmMessage("이미 스캔한 라벨입니다.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }
            }

            if (checkbuf == "NO")
            {
                grdScan.Rows.Add();
                int nownow = grdScan.Rows.Count - 1;

                grdScan["라벨타입", nownow].Value = labeltype;
                grdScan["바코드(스캔)", nownow].Value = _sn;
                grdScan["스캔수량(SN기준)", nownow].Value = qtybuf;

                if(_productorderid.Trim() == "")
                {
                    _productorderid = dt.Rows[0]["PRODUCTORDERID"].ToString().Trim();
                }

                string itemid = dt.Rows[0]["itemid"].ToString();

                search_process(itemid, qtybuf);
            }

        }

        private void moveProduct_main()
        {
            if(txtSN.Text.Trim() == "")
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
            else if(txtSN.Text.Trim().Length > 8)
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

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                moveProduct_main();
            }
        }

        private void txtSN_Leave(object sender, EventArgs e)
        {
            txtSN.BackColor = Color.Red;
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            txtSN.BackColor = Color.Yellow;
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (lblQty.Text.Trim() == "")
            {
                lblQty.Text = "0";
            }

            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(lblQty.Text.Trim().Replace(",", ""));
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblQty.Text = int.Parse(clsStatic._dialogValue).ToString("###,##0");

                grdMain["스캔수량", grdMain.CurrentRow.Index].Value = (int.Parse(grdMain["스캔수량", grdMain.CurrentRow.Index].Value.ToString().Replace(",", "")) + int.Parse(clsStatic._dialogValue)).ToString("###,##0");

                clsStatic._dialogValue = "";
            }
        }

        private void btnPageInit_Click(object sender, EventArgs e)
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
            txtSN.Text = "";
            _sn = "";
            _move_id = "";
            _productorderid = "";

            grdScan.RemoveAll();
            grdMain.RemoveAll();

            txtSN_Focus();

        }

        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if(grdMain.Rows.Count <= 0)
            {
                lblItem.Text = "";
                lblQty.Text = "";
            }
            else
            {
                int nownow = grdMain.CurrentRow.Index;
                lblItem.Text = grdMain["품목", nownow].Value.ToString();
                lblQty.Text = "0";
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
            paramsCheckMap.Add("COMPANY_CD",  clsStatic._COMPANY_CD);

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

            if(int.Parse(checkDt.Rows[0]["MOVECNT"].ToString().Trim()) > 0)
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
            List <Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD",     clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD",      clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID",         move_id);
            paramsMap.Add("TO_LOCATION_CD", clsStatic._TOLINE);
            paramsMap.Add("TRANSFER_FLAG",   "WAIT");
            paramsMap.Add("MOVEKEYCOL",         movekeycol);
            paramsMap.Add("CREATE_BY",        clsStatic._USER_ID);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labelPopMoveTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void move_item_tmp_insert(string move_id, string item_id, int qty, string desc)
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
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD",  clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD",   clsStatic._COMPANY_CD);
            paramsMap.Add("P_STOCK_TYPE",   clsStatic._STOCK_TYPE);
            paramsMap.Add("P_MOVE_ID",      move_id);
            paramsMap.Add("TO_LOCATION_CD", clsStatic._TOLINE);
            paramsMap.Add("P_MODIFIER",     clsStatic._USER_ID);
            paramsMap.Add("P_PO",           _productorderid);
            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable moveDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_move_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (moveDt == null)
            {
                frmMessage frm1 = new frmMessage("이동처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (moveDt.Rows.Count == 0)
            {
                frmMessage frm2 = new frmMessage("이동처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }

            frmMessage frm3 = new frmMessage("이동처리가 정상적으로 처리었습니다.", "AUTOCLOSE");
            frm3.ShowDialog();
            init_process();
            txtSN_Focus();
            return;
        }

        private void btnTransfer_Click(object sender, EventArgs e)
        {
            if(grdMain.Rows.Count <= 0)
            {
                txtSN_Focus();
                return;
            }

            frmMessage frm = new frmMessage("입력한 품목들을 이동처리 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.Cancel)
            {
                txtSN_Focus();
                return;
            }

            string retbuf = "";
            retbuf = get_moveSeq();

            if(retbuf == "NG")
            {
                frmMessage frm1 = new frmMessage("현재 이동처리가 진행중입니다. 잠시후 이동처리 진행 하여 주세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            _move_id = retbuf;

            string desc = "POP 공정이동";

            for (int i = 0; i < grdScan.Rows.Count; i++)
            {
                string movekeycol = grdScan["바코드(스캔)", i].Value.ToString();

                move_label_tmp_insert(_move_id, movekeycol);
            }

            for (int i = 0;i<grdMain.Rows.Count;i++)
            {
                string item_id = grdMain["품목", i].Value.ToString().Replace(",", "");
                int qty = int.Parse(grdMain["스캔수량", i].Value.ToString().Replace(",", ""));

                move_item_tmp_insert(_move_id, item_id, qty, desc);
            }

            move_transfer(_move_id);

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

        private void btnManualPrint_Click(object sender, EventArgs e)
        {
            frmGanbanManual frm = new frmGanbanManual(clsStatic._FROMLINE + "(" + clsStatic._FROMLINE_DESC + ")", clsStatic._FROMLINE);
            frm.ShowDialog();
        }
    }
}
