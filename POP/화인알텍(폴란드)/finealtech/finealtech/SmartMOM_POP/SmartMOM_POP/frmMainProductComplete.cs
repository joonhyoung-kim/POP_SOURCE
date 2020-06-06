using MetroFramework.Forms;
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
    public partial class frmMainProductComplete : Form
    {
        string _serialNumber = "";
        int _ctQty = 0;
        int _gtQty = 0;
        string _lotType = "";
        DataTable _gt_DesignDt = new DataTable();
        DataTable _ct_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();
        string _gtType = "";
        string _ctType = "";
        string _palletType = "";
        string _buttonType = "NODATA";
        bool _search_open_flag = false;
        string _labelspec = "";
        string _labeldesc = "";
        string _longsn = "";
        string _shortsn = "";
        string _printtime = "";

        DataTable _woDt = new DataTable();


        public frmMainProductComplete()
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

            if (serialButton1.IsOpen == true)
            {
                lblButton1.BackColor = Color.ForestGreen;
                lblButton1.Text = "버튼1(동작중)";
            }
            else
            {
                lblButton1.BackColor = Color.Tomato;
                lblButton1.Text = "버튼1(멈춤)";
            }

            if (serialButton2.IsOpen == true)
            {
                lblButton2.BackColor = Color.ForestGreen;
                lblButton2.Text = "버튼2(동작중)";
            }
            else
            {
                lblButton2.BackColor = Color.Tomato;
                lblButton2.Text = "버튼2(멈춤)";
            }

            initLabel();
            InitGTList();
            InitCTList();
            InitBADList();
            InitCTDetailList();

            serialButton1.DataReceived += SerialButton1_DataReceived;
            serialButton2.DataReceived += SerialButton2_DataReceived;
        }

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
            string[] headerText = new string[] { "SN",                "QTY"     }; //2
            string[] columnName = new string[] { "WORKORDERRESULTID", "GOODQTY" };
            string[] columnType = new string[] {  "T",                "T"       };

            int[] columnWidth    = new int[]   {  250,                100       };
            bool[] columnVisible = new bool[]  {  true,               true      };
            bool[] columnDisable = new bool[]  {  true,               true      };
            string[] cellAlign = new string[]  { "C",                 "C"       };

            grdGT.SetBorderAndGridlineStyles();
            grdGT.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGT.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdGT.RowTemplate.Height = 50;
        }

        private void InitCTList()
        {
            //                                   0                         
            string[] headerText = new string[] {  "박스포장번호", "구성수량"        }; //2
            string[] columnName = new string[] { "CT",            "CTCOUNT"         };
            string[] columnType = new string[] {  "T",            "T"               };
                                                              
            int[] columnWidth    = new int[]   { 250,            100               };
            bool[] columnVisible = new bool[]  {  true,           true              };
            bool[] columnDisable = new bool[]  {  true,           true              };
            string[] cellAlign = new string[]  {  "C",            "C"               };

            grdCT.SetBorderAndGridlineStyles();
            grdCT.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdCT.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdCT.RowTemplate.Height = 50;
        }

        private void InitCTDetailList()
        {
            //                                   0                     1                 
            string[] headerText = new string[] {  "SN",                "박스포장번호" }; //1
            string[] columnName = new string[] { "WORKORDERRESULTID",  "CT"           };
            string[] columnType = new string[] {  "T",                 "T"            };
                                                                                   
            int[] columnWidth    = new int[]   {  150,                 150            };
            bool[] columnVisible = new bool[]  {  true,                true           };
            bool[] columnDisable = new bool[]  {  true,                true           };
            string[] cellAlign = new string[]  {  "C",                 "C"            };

            grdCTDetail.SetBorderAndGridlineStyles();
            grdCTDetail.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdCTDetail.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdCTDetail.RowTemplate.Height = 50;
        }

        private void InitBADList()
        {
            //                                   0                   1      
            string[] headerText = new string[] { "SN",                "QTY"     }; //2
            string[] columnName = new string[] { "WORKORDERRESULTID", "BADQTY" };
            string[] columnType = new string[] {  "T",                "T"       };

            int[] columnWidth    = new int[]   {  250,                100       };
            bool[] columnVisible = new bool[]  {  true,               true      };
            bool[] columnDisable = new bool[]  {  true,               true      };
            string[] cellAlign = new string[]  { "C",                 "C"       };

            grdBad.SetBorderAndGridlineStyles();
            grdBad.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdBad.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdBad.RowTemplate.Height = 50;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

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

            //if (openFlag1 == true)
            //{
            //    serialButton1.Close();
            //}
            //if (openFlag2 == true)
            //{
            //    serialButton2.Close();
            //}
            _search_open_flag = true;
            //clsStatic._WORK_ORDER_ID = "";
            frmPOSearch frm = new frmPOSearch("ALL");
            frm.ShowDialog();
            _search_open_flag = false;

            //if (openFlag1 == true)
            //{
            //    serialButton1.Open();
            //}

            //if (openFlag2 == true)
            //{
            //    serialButton2.Open();
            //}

            if (serialButton1.IsOpen == true)
            {
                lblButton1.BackColor = Color.ForestGreen;
                lblButton1.Text = "버튼1(동작중)";
            }
            else
            {
                lblButton1.BackColor = Color.Tomato;
                lblButton1.Text = "버튼1(멈춤)";
            }

            if (serialButton2.IsOpen == true)
            {
                lblButton2.BackColor = Color.ForestGreen;
                lblButton2.Text = "버튼2(동작중)";
            }
            else
            {
                lblButton2.BackColor = Color.Tomato;
                lblButton2.Text = "버튼2(멈춤)";
            }

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

        private DataTable get_sn_label_printinfo(string sn, string ct, string palletid)
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("WORK_ORDER_RESULT_ID", sn);
            paramsMap1.Add("CT",                   ct);
            paramsMap1.Add("PALLETID",             palletid);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable snDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_snlabelinfo_list.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            return snDt;
        }

        private void initLabel()
        {
            btnPOSearch.Text       = "선택";
            lblProductorderid.Text = "";
            lblPlandate.Text       = "";
            lblMakelotqty.Text       = "";
            lblItem.Text           = "";
            lblItemdesc.Text       = "";
            lblPlanQty.Text        = "";
            lblGoodQty.Text        = "";
            lblBadQty.Text         = "";
            lblCancelQty.Text = "";
            txtSN.Text             = "";
            _ctQty                 = 0;

            grdGT.RemoveAll();
            grdCT.RemoveAll();
            grdCTDetail.RemoveAll();
            grdBad.RemoveAll();
        }

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

            if(_woDt == null)
            {
                initLabel();
                return;
            }

            if(_woDt.Rows.Count == 0)
            {
                initLabel();
                return;
            }

            //if(_woDt.Rows[0]["WOSTATE"].ToString().Trim() == "A" && _woDt.Rows[0]["POPINPUTTYPE"].ToString().Trim() == "BUTTON")
            if (_woDt.Rows[0]["WOSTATE"].ToString().Trim() == "A")
            {
                frmMessage frm = new frmMessage("현재 생산품(품명:" + _woDt.Rows[0]["ITEMNAME"].ToString().Trim() + ")의 작업시작을 하겠습니까?", "OK_CANCEL");
                DialogResult result = frm.ShowDialog();

                if (result == DialogResult.OK)
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

                    DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popworesult_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                }
            }

            _gtType = _woDt.Rows[0]["POPGTLABELID"].ToString();
            _ctType = _woDt.Rows[0]["POPCTLABELID"].ToString();
            _palletType = _woDt.Rows[0]["POPPALLETLABELID"].ToString();

            btnPOSearch.Text       = _woDt.Rows[0]["WORKORDERID"].ToString();
            lblProductorderid.Text = _woDt.Rows[0]["PRODUCTORDERID"].ToString();
            lblPlandate.Text       = _woDt.Rows[0]["PLANDATE"].ToString(); 
            lblMakelotqty.Text     = _woDt.Rows[0]["POPMAKELOTQTY"].ToString();
            lblItem.Text           = _woDt.Rows[0]["ITEMID"].ToString();
            lblItemdesc.Text       = _woDt.Rows[0]["ITEMNAME"].ToString();
            lblPlanQty.Text        = _woDt.Rows[0]["CONFIRMQTY"].ToString();
            lblGoodQty.Text        = _woDt.Rows[0]["QTY"].ToString();
            lblBadQty.Text         = _woDt.Rows[0]["BADQTY"].ToString();
            lblCancelQty.Text      = _woDt.Rows[0]["CANCELQTY"].ToString();
            txtSN.Text             = "";
            _ctQty                 = int.Parse(_woDt.Rows[0]["POPCTQTY"].ToString());
            btnPerson.Text         = "투입인원(" + clsStatic._PERSONCOUNT + "명)";
            _labeldesc             = _woDt.Rows[0]["LABELDESC"].ToString();
            _labelspec             = _woDt.Rows[0]["LABELSPEC"].ToString();
            if (destinationFlag == "OK")
            {
                lblDestination.Text = _woDt.Rows[0]["DESTINATION"].ToString();
            }
            lblTodayPlan.Text      = _woDt.Rows[0]["TODAYTEXT"].ToString();
            lblTodayProdQty.Text   = _woDt.Rows[0]["TODAYGOODQTY"].ToString() + " / " + _woDt.Rows[0]["TODAYPLAN"].ToString();
            label15.Text           = _woDt.Rows[0]["NOWBOXCOUNT"].ToString() + " / " + _woDt.Rows[0]["ALLBOXCOUNT"].ToString();

            _lotType = _woDt.Rows[0]["POPINPUTTYPE"].ToString();
            if (_lotType == "BUTTON")
            {
                txtSN.Enabled = false;
                txtSN.BackColor = Color.LightGray;
                btnLabelPrint.Text = "라벨발행(버튼)";
            }
            else
            {
                txtSN.Enabled = true;
                txtSN.BackColor = Color.Yellow;
                btnLabelPrint.Text = "라벨발행(바코드)";
            }

            InitCTDetailList();

            List<Dictionary<string, object>> paramsList2 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap2 = new Dictionary<string, object>();
            paramsMap2.Add("p_err_code", "");
            paramsMap2.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap2.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap2.Add("RESOURCE_CD",   clsStatic._RESOURCE_CD);
            paramsMap2.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);

            paramsList2.Add(paramsMap2);

            DataTable gtDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popgt_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);
            grdGT.DataBindDataSource(gtDt, false, false);

            DataTable ctDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popct_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);
            grdCT.DataBindDataSource(ctDt, false, false);

            DataTable badDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popbadprod_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);
            grdBad.DataBindDataSource(badDt, false, false);

            _gtQty = gtCount();

            if (_ctQty == 0)
            {
                lblBoxCount.Text = _gtQty.ToString() + " EA";
            }
            else
            {
                lblBoxCount.Text = _gtQty.ToString() + " / " + _ctQty.ToString();
            }
        }

        private void get_longshortsn()
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("ITEM_ID", lblItem.Text);
            paramsMap1.Add("PRODUCT_ORDER_ID", lblProductorderid.Text);


            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_longshortsn2.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);
            string longshortTemp = dt.Rows[0]["longshortsn"].ToString();
            if (longshortTemp == "NODATA")
            {
                _longsn = "";
                _shortsn = "";
            }
            else
            {
                string[] strs = longshortTemp.Split('^');
                _longsn = strs[0].Replace("NODATA", "");
                _shortsn = strs[1].Replace("NODATA", "");
            }
            //_longsn = dt.Rows[0]["longsn"].ToString().Replace("NODATA", "");
            //_shortsn = dt.Rows[0]["shortsn"].ToString().Replace("NODATA", "");


        }

        private int gtCount()
        {
            int retbuf = 0;
            for(int i=0;i<grdGT.Rows.Count;i++)
            {
                int qty = int.Parse(grdGT.Rows[i].Cells["QTY"].Value.ToString().Replace(",", ""));

                retbuf += qty;
            }

            return retbuf;
        }

        private void snMake()
        {
            if(btnPOSearch.Text == "선택")
            {
                return;
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("P_FLAG",          "G");
            paramsMap.Add("P_ITEM_ID",       lblItem.Text);
            paramsMap.Add("P_SCODE",         "K");
            paramsMap.Add("P_CCODE",         "HA");
            paramsMap.Add("P_WORK_ORDER_ID", btnPOSearch.Text);
            paramsMap.Add("P_CREATE_BY",     clsStatic._USER_ID);
            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable snDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_snmake_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

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

            _serialNumber = snDt.Rows[0]["p_err_msg"].ToString();

            get_longshortsn();
        }
        
        private void snmakeAndLabelprint()
        {
            snMake();
            string gtport = _woDt.Rows[0]["POPGTLABELID"].ToString().Trim();
            if (_gtType != "NONE" && _gtType != "")
            {
                _woDt.Rows[0]["SN"] = _serialNumber;
                _woDt.Rows[0]["LONGSN"] = _longsn;
                _woDt.Rows[0]["SHORTSN"] = _shortsn;

                _gt_DesignDt.Dispose();
                _gt_DesignDt = new DataTable();

                _gt_DesignDt = clsLabelSet.LabelDesignDataSet(_gtType);

                clsLabelSet.dt_label_print(clsStatic._MACADDRESS, "GTPRINT", ref _gt_DesignDt, ref _BasicDs, ref _woDt);
            }
        }

        private void btnLabelPrint_Click(object sender, EventArgs e)
        {
            button_label_print();
        }

        private void button_label_print()
        {
            if(_search_open_flag == true)
            {
                return;
            }

            if(btnPOSearch.Text == "선택")
            {
                frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            int checkplanqty = int.Parse(lblPlanQty.Text.Trim().Replace(",", ""));
            int checkprodqty = 0;

            //실적수량 = 양품수량 로직임으로 해당로직 수정
            //if (clsStatic._BADQTYFLAG == "Y")
            //{
            //    checkprodqty = int.Parse(lblGoodQty.Text.Trim()) + int.Parse(lblCancelQty.Text.Trim()) + int.Parse(lblBadQty.Text.Trim());
            //}
            //else
            //{
            //    checkprodqty = int.Parse(lblGoodQty.Text.Trim()) + int.Parse(lblCancelQty.Text.Trim());
            //}
            //실적수량 = 양품수량 로직임으로 해당로직 수정
            checkprodqty = int.Parse(lblGoodQty.Text.Trim().Replace(",", ""));

            if (checkplanqty <= checkprodqty)
            {
                frmMessage frm1 = new frmMessage("생산이 완료되었습니다!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (_lotType == "SN")
            {
                snmakeAndLabelprint();

                txtSN_Focus();
            }
            else if (_lotType == "BUTTON")
            {
                snmakeAndLabelprint();
                //snMake();
                product_insert(_serialNumber);
            }
        }

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Enter)
            {
                product_insert(txtSN.Text);
                txtSN.Text = "";
            }
        }

        private void product_insert(string sn)
        {
            int checkplanqty = int.Parse(lblPlanQty.Text.Trim().Replace(",", ""));
            int checkprodqty = 0;


            //실적수량 = 양품수량 로직임으로 해당로직 수정
            //if (clsStatic._BADQTYFLAG == "Y")
            //{
            //    checkprodqty = int.Parse(lblGoodQty.Text.Trim()) + int.Parse(lblCancelQty.Text.Trim()) + int.Parse(lblBadQty.Text.Trim());
            //}
            //else
            //{
            //    checkprodqty = int.Parse(lblGoodQty.Text.Trim()) + int.Parse(lblCancelQty.Text.Trim());
            //}

            //실적수량 = 양품수량 로직임으로 해당로직 수정
            checkprodqty = int.Parse(lblGoodQty.Text.Trim().Replace(",", ""));

            if (checkplanqty <= checkprodqty)
            {
                frmMessage frm1 = new frmMessage("생산이 완료되었습니다!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }


            string qty = "";

            qty = lblMakelotqty.Text;

            //if (_lotType == "BUTTON")
            //{
            //    qty = _ctQty.ToString();
            //}
            //else
            //{
            //    qty = lblMakelotqty.Text;
            //}

            int prodqty = 0;
            //실적수량 = 양품수량 로직임으로 해당로직 수정
            //if (clsStatic._BADQTYFLAG == "Y")
            //{
            //    prodqty = int.Parse(lblGoodQty.Text.Trim()) + int.Parse(lblCancelQty.Text.Trim()) + int.Parse(lblBadQty.Text.Trim());
            //}
            //else
            //{
            //    prodqty = int.Parse(lblGoodQty.Text.Trim()) + int.Parse(lblCancelQty.Text.Trim());
            //}

            //실적수량 = 양품수량 로직임으로 해당로직 수정
            prodqty = int.Parse(lblGoodQty.Text.Trim());

            int plan_qty = int.Parse(lblPlanQty.Text.Replace(",", ""));

            prodqty = plan_qty - prodqty;


            if (_lotType == "SN" || qty == "99999")
            {
                if (int.Parse(qty.Replace(",", "")) > prodqty)
                {
                    qty = prodqty.ToString();
                }
            }

            //if (qty <= prodqty)
            //{
            //    //sn_ct_packing();
            //}


            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_serialnumber",   sn);
            paramsMap.Add("p_division_cd",    clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd",     clsStatic._COMPANY_CD);
            paramsMap.Add("p_work_order_id",  btnPOSearch.Text);
            paramsMap.Add("p_wo_state",       "R");
            paramsMap.Add("p_shift_cd",       "DAY");
            paramsMap.Add("p_work_person",    clsStatic._PERSONCOUNT);
            paramsMap.Add("p_good_qty",       qty);
            paramsMap.Add("p_bad_qty",        "0");
            paramsMap.Add("p_description",    "POP 실적");
            paramsMap.Add("p_close_flag",     "N");
            paramsMap.Add("p_badcode",        "NODATA");
            paramsMap.Add("p_destination",    lblDestination.Text.Trim());
            paramsMap.Add("p_update_by",      clsStatic._USER_ID);
            paramsMap.Add("p_short_sn",       _shortsn);
            paramsMap.Add("p_long_sn",        _longsn);




            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popworesult_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if(dt.Rows[0]["p_err_code"].ToString() == "S")
            {
                wo_search("NO");

                if (_gtQty >= _ctQty)
                {
                    sn_ct_packing();
                }
                else
                {
                    string packbuf = lot_ctpacking();

                    if(packbuf == "NOPACKING")
                    {
                        int planqty = int.Parse(lblPlanQty.Text.Trim().Replace(",", ""));

                        //실적수량 = 양품수량 로직임으로 해당로직 수정
                        //if (clsStatic._BADQTYFLAG == "Y")
                        //{
                        //    prodqty = int.Parse(lblGoodQty.Text.Trim()) + int.Parse(lblCancelQty.Text.Trim()) + int.Parse(lblBadQty.Text.Trim());
                        //}
                        //else
                        //{
                        //    prodqty = int.Parse(lblGoodQty.Text.Trim()) + int.Parse(lblCancelQty.Text.Trim());
                        //}
                        //실적수량 = 양품수량 로직임으로 해당로직 수정
                        prodqty = int.Parse(lblGoodQty.Text.Trim().Replace(",", ""));


                        if (planqty > prodqty && _lotType == "SN")
                        {
                            snmakeAndLabelprint();
                        }
                    }
                }

                
            }
            else
            {
                frmMessage frm = new frmMessage(dt.Rows[0]["p_err_msg"].ToString(), "AUTOCLOSE");
                frm.ShowDialog();
            }

        }

        private string lot_ctpacking()
        {
            string retbuf = "NOPACKING";
            int planqty = int.Parse(lblPlanQty.Text.Trim().Replace(",", ""));
            int prodqty = 0;
            //실적수량 = 양품수량 로직임으로 해당로직 수정
            //if (clsStatic._BADQTYFLAG == "Y")
            //{
            //    prodqty = int.Parse(lblGoodQty.Text.Trim()) + int.Parse(lblCancelQty.Text.Trim()) + int.Parse(lblBadQty.Text.Trim());
            //}
            //else
            //{
            //    prodqty = int.Parse(lblGoodQty.Text.Trim()) + int.Parse(lblCancelQty.Text.Trim());
            //}
            //실적수량 = 양품수량 로직임으로 해당로직 수정
            prodqty = int.Parse(lblGoodQty.Text.Trim().Replace(",", ""));


            if (planqty <= prodqty)
            {
                sn_ct_packing();
                retbuf = "PACKING";
            }

            return retbuf;
        }

        private void btnTitle_Click(object sender, EventArgs e)
        {
            wo_search("NO");
            txtSN_Focus();
        }

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
            paramsMap.Add("P_WORK_ORDER_ID", btnPOSearch.Text);
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

        private void btnCTPacking_Click(object sender, EventArgs e)
        {
            if (btnPOSearch.Text == "선택")
            {
                frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (_gtQty >  0)
            {
                sn_ct_packing();
            }
        }

        private void grdCT_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int columnIndex = ((ExGrid)sender).CurrentCell.ColumnIndex;
            int rowIndex = ((ExGrid)sender).CurrentRow.Index;
            string CT = "";

            if (rowIndex >= 0)
            {
                CT = grdCT.Rows[rowIndex].Cells["박스포장번호"].Value.ToString();

                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
                paramsMap.Add("RESOURCE_CD",   clsStatic._RESOURCE_CD);
                paramsMap.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
                paramsMap.Add("CT",            CT);

                paramsList.Add(paramsMap);

                string retvalue = "";

                DataTable ctdetailDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popctingt_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
                grdCTDetail.DataBindDataSource(ctdetailDt, false, false);
            }
        }

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
        }

        private void button_badqty()
        {
            clsStatic._dialogValue = "";
            frmBadProductInsert frm = new frmBadProductInsert(btnPOSearch.Text, "1", "DAY", "", "", "", "", "");
            frm.ShowDialog();

            if (clsStatic._dialogValue == "OK")
            {
                wo_search("NO");
            }
        }

        private void btnPerson_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(clsStatic._PERSONCOUNT);
            frm.ShowDialog();

            if(clsStatic._dialogValue != "")
            {
                clsStatic._PERSONCOUNT = clsStatic._dialogValue;

                btnPerson.Text = "투입인원(" + clsStatic._PERSONCOUNT + "명)";

                clsStatic._dialogValue = "";
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

        private void timerButtonClose_Tick(object sender, EventArgs e)
        {
            timerButtonClose.Enabled = false;
            serialButton1.Close();
        }

        private void btnGTReprint_Click(object sender, EventArgs e)
        {
            if (grdGT.Rows.Count > 0)
            {
                string gt = grdGT.Rows[0].Cells["SN"].Value.ToString();
                frmBadProductInsert frm = new frmBadProductInsert("박스라벨 재발행", gt, "", "SN", clsStatic._MACADDRESS, _gtType, _ctType, _gt_DesignDt, _ct_DesignDt, _BasicDs);
                frm.ShowDialog();
            }
        }

        private void btnCTReprint_Click(object sender, EventArgs e)
        {
            if (grdCT.Rows.Count > 0)
            {
                string ct = grdCT.Rows[0].Cells["박스포장번호"].Value.ToString();
                frmBadProductInsert frm = new frmBadProductInsert("박스라벨 재발행", "", ct, "CT", clsStatic._MACADDRESS, _gtType, _ctType, _gt_DesignDt, _ct_DesignDt, _BasicDs);
                frm.ShowDialog();
            }
        }

        private void btnCTGTReprint_Click(object sender, EventArgs e)
        {
            if (grdCTDetail.Rows.Count > 0)
            {
                string gt = grdCTDetail.Rows[0].Cells["SN"].Value.ToString();
                frmBadProductInsert frm = new frmBadProductInsert("박스라벨 재발행", gt, "", "SN", clsStatic._MACADDRESS, _gtType, _ctType, _gt_DesignDt, _ct_DesignDt, _BasicDs);
                frm.ShowDialog();
            }
        }

        private void lblLine_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }

        private void lblMakelotqty_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(lblMakelotqty.Text);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblMakelotqty.Text = clsStatic._dialogValue;

                clsStatic._dialogValue = "";
            }
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

        private void frmMainProductComplete_FormClosed(object sender, FormClosedEventArgs e)
        {
            serialButton1.Close();
            serialButton2.Close();
        }

        private void btnReprintCT_Click(object sender, EventArgs e)
        {
            if (grdCT.Rows.Count > 0)
            {
                string ct = grdCT.Rows[0].Cells["박스포장번호"].Value.ToString();
                frmBadProductInsert frm = new frmBadProductInsert("박스라벨 재발행", "", ct, "CT", clsStatic._MACADDRESS, _gtType, _ctType, _gt_DesignDt, _ct_DesignDt, _BasicDs);
                //frm.ShowDialog();
                txtSN_Focus();
            }
        }

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

        private void btnCtReprintNewForm_Click(object sender, EventArgs e)
        {
            frmCTReprint frm = new frmCTReprint(grdCT.BindDataTable, _gtType, _ctType, _gt_DesignDt, _ct_DesignDt, _BasicDs);
            frm.ShowDialog();
        }
    }
}

