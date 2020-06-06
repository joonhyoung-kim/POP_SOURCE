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
        string _work_day = "";
        string _start_time = "";

        DataTable _gtDt = new DataTable();
        DataTable _ctDt = new DataTable();
        DataTable _badDt = new DataTable();

        DataTable _woDt = new DataTable();

        DataTable _nonworkDt = new DataTable();
        DataTable _wobadDt = new DataTable();


        public frmMainProductComplete()
        {
            if(clsStatic._FormsFullScreen == true)
            {
                this.WindowState = FormWindowState.Maximized;
            }

            InitializeComponent();

            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);

            _nonworkDt = clsUtil.code_class_load("NON_WORK_TYPE");
            _wobadDt   = clsUtil.code_class_load("WO_BAD_TYPE");

            now_nonwork_load("INIT");
        }

        private void AutoFontSizeAndValue(object obj, String text, Single ratio)
        {
            string strType = obj.GetType().Name;

            Font ft;
            Graphics gp;
            SizeF sz;
            Single Faktor, FaktorX, FaktorY;
            if (strType == "Label")
            {
                if (text == "")
                {
                    ((Label)obj).Text = text;
                    return;
                }

                gp = ((Label)obj).CreateGraphics();
                sz = gp.MeasureString(text, ((Label)obj).Font);
                gp.Dispose();

                FaktorX = (((Label)obj).Width) / sz.Width;
                FaktorY = (((Label)obj).Height) / sz.Height;
                if (FaktorX > FaktorY)
                    Faktor = FaktorY;
                else
                    Faktor = FaktorX;
                ft = ((Label)obj).Font;

                ((Label)obj).Text = text;

                if (Faktor > 0)
                {
                    if (ft.SizeInPoints * (Faktor) > ratio)
                    {
                        ((Label)obj).Font = new Font(ft.Name, ft.SizeInPoints * (Faktor) - ratio, FontStyle.Bold);
                    }
                    else
                    {
                        ((Label)obj).Font = new Font(ft.Name, ft.SizeInPoints * (Faktor), FontStyle.Bold);
                    }
                }
                else
                {
                    ((Label)obj).Font = new Font(ft.Name, ft.SizeInPoints * (0.1f), FontStyle.Bold);
                }
            }
            else if (strType == "Button")
            {
                if (text == "")
                {
                    ((Button)obj).Text = text;
                    return;
                }

                gp = ((Button)obj).CreateGraphics();
                sz = gp.MeasureString(text, ((Button)obj).Font);
                gp.Dispose();

                FaktorX = (((Button)obj).Width) / sz.Width;
                FaktorY = (((Button)obj).Height) / sz.Height;
                if (FaktorX > FaktorY)
                    Faktor = FaktorY;
                else
                    Faktor = FaktorX;
                ft = ((Button)obj).Font;

                ((Button)obj).Text = text;

                if (Faktor > 0)
                {
                    if (ft.SizeInPoints * (Faktor) > ratio)
                    {
                        ((Button)obj).Font = new Font(ft.Name, ft.SizeInPoints * (Faktor) - ratio, FontStyle.Bold);
                    }
                    else
                    {
                        ((Button)obj).Font = new Font(ft.Name, ft.SizeInPoints * (Faktor), FontStyle.Bold);
                    }
                }
                else
                {
                    ((Button)obj).Font = new Font(ft.Name, ft.SizeInPoints * (0.1f), FontStyle.Bold);
                }
            }
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

            if (serialButton1.IsOpen == true)
            {
                lblButton1.BackColor = Color.Black;
                lblButton1.Text = "버튼1(동작중)";
            }
            else
            {
                lblButton1.BackColor = Color.Tomato;
                lblButton1.Text = "버튼1(멈춤)";
            }

            initLabel();

            serialButton1.DataReceived += SerialButton1_DataReceived;
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

            string tmpWorkorderid = clsStatic._WORK_ORDER_ID;
            clsStatic._WORK_ORDER_ID = "";

            _search_open_flag = true;
            //clsStatic._WORK_ORDER_ID = "";
            clsStatic._dialogValue = "";
            clsStatic._DESTINATION = "";
            frmPOSearch frm = new frmPOSearch("ALL");
            frm.ShowDialog();
            _search_open_flag = false;

            if(clsStatic._dialogValue != "")
            {
                frmMessage frm2 = new frmMessage(clsStatic._dialogValue + "이 필요한 제품입니다.", "AUTOCLOSE");
                frm2.ShowDialog();
                clsStatic._dialogValue = "";
            }

            if (clsStatic._DESTINATION != "")
            {
                lblDestination.Text = clsStatic._DESTINATION;
                clsStatic._DESTINATION = "";
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

            if (clsStatic._WORK_ORDER_ID != "")
            {
                wo_search("OK");
            }
            else
            {
                clsStatic._WORK_ORDER_ID = tmpWorkorderid;
            }

            if (_gtType != "")
            {
                _gt_DesignDt.Dispose();
                _gt_DesignDt = new DataTable();
                _gt_DesignDt = clsLabelSet.LabelDesignDataSet(_gtType);
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
            _woDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popwo1.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

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

                    DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popworesult_proc1.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                }
            }

            _gtType = _woDt.Rows[0]["POPGTLABELID"].ToString();
            _ctType = _woDt.Rows[0]["POPCTLABELID"].ToString();
            _palletType = _woDt.Rows[0]["POPPALLETLABELID"].ToString();

            AutoFontSizeAndValue(btnPOSearch, _woDt.Rows[0]["WORKORDERID"].ToString(), 10);
            AutoFontSizeAndValue(lblItem, _woDt.Rows[0]["ITEMID"].ToString(), 10);
            AutoFontSizeAndValue(lblProductorderid, _woDt.Rows[0]["PRODUCTORDERID"].ToString(), 10);
            AutoFontSizeAndValue(lblPlandate, _woDt.Rows[0]["PLANDATE"].ToString(), 5);
            AutoFontSizeAndValue(lblMakelotqty, _woDt.Rows[0]["POPMAKELOTQTY"].ToString(), 10);
            AutoFontSizeAndValue(lblItem, _woDt.Rows[0]["ITEMID"].ToString(), 10);
            AutoFontSizeAndValue(lblItemdesc, _woDt.Rows[0]["ITEMNAME"].ToString(), 10);
            AutoFontSizeAndValue(lblPlanQty, _woDt.Rows[0]["CONFIRMQTY"].ToString(), 10);
            AutoFontSizeAndValue(lblGoodQty, _woDt.Rows[0]["QTY"].ToString(), 10);
            AutoFontSizeAndValue(lblBadQty, _woDt.Rows[0]["BADQTY"].ToString(), 10);
            AutoFontSizeAndValue(lblCancelQty, _woDt.Rows[0]["CANCELQTY"].ToString(), 10);
            AutoFontSizeAndValue(btnPerson, "투입인원(" + clsStatic._PERSONCOUNT + "명)", 10);

            txtSN.Text             = "";
            _ctQty                 = int.Parse(_woDt.Rows[0]["POPCTQTY"].ToString());
            _labeldesc             = _woDt.Rows[0]["LABELDESC"].ToString();
            _labelspec             = _woDt.Rows[0]["LABELSPEC"].ToString();
            if (destinationFlag == "OK")
            {
                if (_woDt.Rows[0]["LASTDESTINATION"].ToString() == "NODATA")
                {
                    AutoFontSizeAndValue(lblDestination, _woDt.Rows[0]["DESTINATION"].ToString(), 10);
                }
                else
                {
                    AutoFontSizeAndValue(lblDestination, _woDt.Rows[0]["LASTDESTINATION"].ToString(), 10);
                }
            }
            lblTodayPlan.Text = _woDt.Rows[0]["TODAYTEXT"].ToString();
            //AutoFontSizeAndValue(lblTodayPlan, _woDt.Rows[0]["TODAYTEXT"].ToString(), 10);
            AutoFontSizeAndValue(lblTodayProdQty, _woDt.Rows[0]["TODAYGOODQTY"].ToString(), 10);
            AutoFontSizeAndValue(label15, _woDt.Rows[0]["NOWBOXCOUNT"].ToString() + "/" + _woDt.Rows[0]["ALLBOXCOUNT"].ToString(), 30);

            _lotType = _woDt.Rows[0]["POPINPUTTYPE"].ToString();
            if (_lotType == "BUTTON")
            {
                txtSN.Enabled = false;
                txtSN.BackColor = Color.LightGray;
                btnLabelPrint.Text = "라벨발행(버튼)";
                AutoFontSizeAndValue(btnLabelPrint, "라벨발행(버튼)", 10);
            }
            else
            {
                txtSN.Enabled = true;
                txtSN.BackColor = Color.Yellow;
                AutoFontSizeAndValue(btnLabelPrint, "라벨발행(바코드)", 10);
            }
            AutoFontSizeAndValue(lblSpec, _woDt.Rows[0]["WOSPEC"].ToString(), 10);

            List<Dictionary<string, object>> paramsList2 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap2 = new Dictionary<string, object>();
            paramsMap2.Add("p_err_code", "");
            paramsMap2.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap2.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap2.Add("RESOURCE_CD",   clsStatic._RESOURCE_CD);
            paramsMap2.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);

            paramsList2.Add(paramsMap2);

            _gtDt.Dispose();
            _gtDt = new DataTable();
            _gtDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popgt1_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);

            _ctDt.Dispose();
            _ctDt = new DataTable();
            _ctDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popct_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);

            //_badDt.Dispose();
            //_badDt = new DataTable();
            //_badDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popbadprod_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);

            _gtQty = gtCount();

            int ctqty = int.Parse(_woDt.Rows[0]["QTY"].ToString());
            int ctproductcnt = ctqty - _gtQty;
            int ctplanqty = int.Parse(_woDt.Rows[0]["CONFIRMQTY"].ToString()) - ctproductcnt;
            if(_ctQty > ctplanqty)
            {
                _ctQty = ctplanqty;
            }

            if (_ctQty == 0)
            {
                AutoFontSizeAndValue(lblBoxCount, _gtQty.ToString() + " EA", 10);
            }
            else
            {
                AutoFontSizeAndValue(lblBoxCount, _gtQty.ToString() + "/" + _ctQty.ToString(), 30);
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
            for(int i=0;i<_gtDt.Rows.Count;i++)
            {
                int qty = int.Parse(_gtDt.Rows[i]["GOODQTY"].ToString());

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

                // 디자인 DataTable을 작업지시 Load시 가져옴.
                //_gt_DesignDt.Dispose();
                //_gt_DesignDt = new DataTable();

                //_gt_DesignDt = clsLabelSet.LabelDesignDataSet(_gtType);

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

            int checkplanqty = int.Parse(lblPlanQty.Text.Trim());
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
            checkprodqty = int.Parse(lblGoodQty.Text.Trim());

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
                if(txtSN.Text.Trim() == "")
                {
                    return;
                }

                if (txtSN.Text.Trim() == "NEWWO")
                {
                    button_po_search();
                    return;
                }

                if (txtSN.Text.Trim() == "LASTWO")
                {
                    List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
                    Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
                    paramsMap1.Add("p_err_code", "");
                    paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                    paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                    paramsMap1.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);
                    paramsList1.Add(paramsMap1);
                    string retvalue = "";
                    DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getlastsn.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

                    if(dt == null)
                    {
                        button_po_search();
                    }
                    else if (dt.Rows.Count == 0)
                    {
                        button_po_search();
                    }
                    else if (dt.Rows[0]["WORKORDERID"].ToString() == "NODATA")
                    {
                        button_po_search();
                    }
                    else if (dt.Rows[0]["WOSTATE"].ToString() == "A" || dt.Rows[0]["WOSTATE"].ToString() == "R" || dt.Rows[0]["WOSTATE"].ToString() == "H")
                    {
                        clsStatic._WORK_ORDER_ID = dt.Rows[0]["WORKORDERID"].ToString();
                        wo_search("OK");
                    }
                    else
                    {
                        button_po_search();
                    }
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }

                if (txtSN.Text.Trim() == "NEWBARCODE")
                {
                    button_label_print();
                    return;
                }

                DataRow[] drs1 = _nonworkDt.Select("NONTYPE='" + txtSN.Text.Trim() + "'");
                if(drs1.Length > 0)
                {
                    if (_work_day == "")
                    {
                        today_info_load();
                        result_info_load();
                    }

                    string nontype = drs1[0]["NONTYPE"].ToString();
                    string buf = nontype + "[" + drs1[0]["NONTYPENAME"].ToString() +"]";

                    string nowclassid = drs1[0]["NONCLASSID"].ToString();
                    string nowworkcd = drs1[0]["NONWORKCD"].ToString();

                    frmNonProdTime frm = new frmNonProdTime(buf, _work_day, nowclassid, nowworkcd, nontype, "START");
                    frm.ShowDialog();
                    return;
                }

                if(btnPOSearch.Text == "선택")
                {
                    frmMessage frm = new frmMessage("작업지시번호를 선택 후 스캔하여 주세요.", "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }

                DataRow[] drs2 = _wobadDt.Select("NONTYPE='" + txtSN.Text.Trim() + "'");
                if (drs2.Length > 0)
                {
                    string buf = drs2[0]["NONTYPE"].ToString() + "[" + drs2[0]["NONTYPENAME"].ToString() + "]";
                    bad_insert(txtSN.Text.Trim(), buf);

                    wo_search("NO");
                    return;
                }

                product_insert(txtSN.Text);
                txtSN.Text = "";
            }
        }

        private void product_insert(string sn)
        {
            int checkplanqty = int.Parse(lblPlanQty.Text.Trim());
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
            checkprodqty = int.Parse(lblGoodQty.Text.Trim());

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
                if (int.Parse(qty) > prodqty)
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
            paramsMap.Add("p_ct", "");
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
            paramsMap.Add("p_ctqty",          _ctQty);
            paramsMap.Add("p_planqty",        lblPlanQty.Text);
            paramsMap.Add("p_prodqty",        lblGoodQty.Text);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popworesult_proc1.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if(dt.Rows[0]["p_err_code"].ToString() == "S")
            {
                string ct = dt.Rows[0]["P_CT"].ToString().Trim();

                if(ct != "NODATA")
                {
                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", ct, "", "", ref _BasicDs);
                }

                wo_search("NO");

                string packbuf = lot_ctpacking();

                if (packbuf == "NOPACKING")
                {
                    int planqty = int.Parse(lblPlanQty.Text.Trim());

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


                    if (planqty > prodqty && _lotType == "SN")
                    {
                        if (ct == "NODATA")
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
            int planqty = int.Parse(lblPlanQty.Text.Trim());
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


            if (planqty <= prodqty)
            {
                //sn_ct_packing();
                retbuf = "PACKING";
            }

            return retbuf;
        }

        private void btnTitle_Click(object sender, EventArgs e)
        {
            if(this.WindowState == FormWindowState.Maximized)
            {
                this.WindowState = FormWindowState.Normal;
            }
            else
            {
                this.WindowState = FormWindowState.Maximized;
            }
            txtSN_Focus();


            //if (btnPOSearch.Text == "선택")
            //{
            //    frmMessage frm1 = new frmMessage("작업지시를 먼저 선택하여 주세요!", "AUTOCLOSE");
            //    frm1.ShowDialog();
            //    txtSN_Focus();
            //    return;
            //}

            //wo_search("NO");

            //_gt_DesignDt.Dispose();
            //_gt_DesignDt = new DataTable();

            //_gt_DesignDt = clsLabelSet.LabelDesignDataSet(_gtType);

            //txtSN_Focus();
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
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", dt.Rows[0]["p_ct"].ToString(), "", "", ref _BasicDs);
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
                //sn_ct_packing();
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("p_err_msg", "");
                paramsMap.Add("p_ct", "");
                paramsMap.Add("p_serialnumber", "CTMANUALMAKE");
                paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
                paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
                paramsMap.Add("p_work_order_id", btnPOSearch.Text);
                paramsMap.Add("p_wo_state", "R");
                paramsMap.Add("p_shift_cd", "DAY");
                paramsMap.Add("p_work_person", clsStatic._PERSONCOUNT);
                paramsMap.Add("p_good_qty", _gtQty.ToString());
                paramsMap.Add("p_bad_qty", "0");
                paramsMap.Add("p_description", "POP 실적");
                paramsMap.Add("p_close_flag", "N");
                paramsMap.Add("p_badcode", "NODATA");
                paramsMap.Add("p_destination", lblDestination.Text.Trim());
                paramsMap.Add("p_update_by", clsStatic._USER_ID);
                paramsMap.Add("p_short_sn", _shortsn);
                paramsMap.Add("p_long_sn", _longsn);
                paramsMap.Add("p_ctqty", _gtQty.ToString());
                paramsMap.Add("p_planqty", lblPlanQty.Text);
                paramsMap.Add("p_prodqty", lblGoodQty.Text);

                paramsList.Add(paramsMap);

                string retvalue = "";

                DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popworesult_proc1.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                if (dt.Rows[0]["p_err_code"].ToString() == "S")
                {
                    string ct = dt.Rows[0]["P_CT"].ToString().Trim();

                    if (ct != "NODATA")
                    {
                        clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", ct, "", "", ref _BasicDs);
                    }

                    wo_search("NO");

                }
                else
                {
                    frmMessage frm = new frmMessage(dt.Rows[0]["p_err_msg"].ToString(), "AUTOCLOSE");
                    frm.ShowDialog();
                }


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
            frmBadProductInsert frm = new frmBadProductInsert(btnPOSearch.Text, "1", _wobadDt);
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
        }

        private void lblDestination_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "DESTINATION";
            clsStatic._dialogValue = "";
            frmCommonSelect frm = new frmCommonSelect("향지");
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                AutoFontSizeAndValue(lblDestination, clsStatic._dialogValue, 10);
                clsStatic._dialogValue = "";
            }
        }

        private void btnCtReprintNewForm_Click(object sender, EventArgs e)
        {
            string retvalue = "";

            List<Dictionary<string, object>> paramsList2 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap2 = new Dictionary<string, object>();
            paramsMap2.Add("p_err_code", "");
            paramsMap2.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap2.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap2.Add("RESOURCE_CD",   clsStatic._RESOURCE_CD);
            paramsMap2.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);

            paramsList2.Add(paramsMap2);

            _ctDt.Dispose();
            _ctDt = new DataTable();
            _ctDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popct_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);

            frmCTReprint frm = new frmCTReprint(_ctDt, _gtType, _ctType, _gt_DesignDt, _ct_DesignDt, _BasicDs);
            frm.ShowDialog();
        }

        private void btnReprintCT_Click(object sender, EventArgs e)
        {
            if (_ctDt.Rows.Count > 0)
            {
                string ct = _ctDt.Rows[0]["CT"].ToString();
                frmBadProductInsert frm = new frmBadProductInsert("박스라벨 재발행", "", ct, "CT", clsStatic._MACADDRESS, _gtType, _ctType, _gt_DesignDt, _ct_DesignDt, _BasicDs);
                //frm.ShowDialog();
            }
            txtSN_Focus();
        }

        private void btnNonProd_Click(object sender, EventArgs e)
        {
            now_nonwork_load("LOSS");
        }

        #region method : 비가동 코드 리스트 조회
        private void now_nonwork_load(string initFlag)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);

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

                frmNonProd frm = new frmNonProd(_work_day, _nonworkDt);
                frm.ShowDialog();
            }
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
                    clsStatic._SHIFT_ID = dt.Rows[i]["SHIFTID"].ToString();
                    break;
                }

                // 시간구간내 존재하지 않을 경우 강제로 해당 일자 정보 삽입
                if (i == dt.Rows.Count - 1)
                {
                    _work_day = dt.Rows[i]["APPLYDATE"].ToString();
                    _start_time = dt.Rows[i]["STARTTIME"].ToString();
                    clsStatic._SHIFT_ID = dt.Rows[i]["SHIFTID"].ToString();
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


        private void bad_insert(string sn, string errtext)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_ct", "");
            paramsMap.Add("p_serialnumber", sn);
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_work_order_id", btnPOSearch.Text);
            paramsMap.Add("p_wo_state", "R");
            paramsMap.Add("p_shift_cd", "DAY");
            paramsMap.Add("p_work_person", clsStatic._PERSONCOUNT);
            paramsMap.Add("p_good_qty", "0");
            paramsMap.Add("p_bad_qty", "1");
            paramsMap.Add("p_description", "POP 불량 실적");
            paramsMap.Add("p_close_flag", "N");
            paramsMap.Add("p_badcode", sn);
            paramsMap.Add("p_destination", "");
            paramsMap.Add("p_update_by", clsStatic._USER_ID);
            paramsMap.Add("p_short_sn", "");
            paramsMap.Add("p_long_sn", "");
            paramsMap.Add("p_ctqty", "0");
            paramsMap.Add("p_planqty", "0");
            paramsMap.Add("p_prodqty", "0");

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popworesult_proc1.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "S")
            {
                frmMessage frm = new frmMessage(errtext + " 1EA", "AUTOCLOSE", 2);
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }
            else
            {
                frmMessage frm = new frmMessage(dt.Rows[0]["p_err_msg"].ToString(), "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }
        }
    }
}

