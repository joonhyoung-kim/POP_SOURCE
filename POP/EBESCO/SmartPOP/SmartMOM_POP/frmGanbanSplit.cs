using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmGanbanSplit : Form
    {
        DataTable _ganban_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();

        DataTable _ganHeadDt = new DataTable();
        DataTable _ganBodyDt = new DataTable();
        DataTable _itemDt = new DataTable();
        double _makeGanban = 0;
        double _allqty = 0;
        double _makeqty = 0;
        string _work_order_id = "";
        string _fromDesc = "";
        string _pa_ganban_id = "";
        string _ganbanType = "";
        string _sn = "";
        string _useyn = "";
        string _stockid = "";

        public frmGanbanSplit()
        {
            InitializeComponent();

            InitGanbanListDP();

            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);

            btnSet_Click(null, null);
        }

        //public frmGanbanSplit(string startNumber)
        //{
        //    InitializeComponent();

        //    InitGanbanList();

        //    _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);

        //    btnInit.Enabled = false;
        //    _grFlag = "GR";

        //    txtSN.Text = startNumber;
        //    ganban_main_process();
        //}

        private void InitGanbanListDP()
        {
            //                                   0               1               2                   3              4                 5                6                7                8               9           10           11             
            string[] headerText = new string[] { "사용여부", "간판라벨번호", "발주번호", "W/O", "FROM창고", "현재창고", "이동일자", "이동담당자", "구성수량", "생성자", "생성일자" }; //12
            string[] columnName = new string[] { "USEYN", "GANBANID", "DEPARTUREGROUPID", "WORKORDERID", "FROMLOCATIONCD", "LOCATIONCD", "MOVEDATE", "MOVEBY", "QTY", "NAME", "CREATEDATE" };
            string[] columnType = new string[] { "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T" };

            int[] columnWidth = new int[] { 150, 150, 250, 200, 250, 250, 250, 250, 150, 200, 250 };
            bool[] columnVisible = new bool[] { true, true, true, true, true, true, true, true, true, true, true };
            bool[] columnDisable = new bool[] { true, true, true, true, true, true, true, true, true, true, true };
            string[] cellAlign = new string[] { "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C" };

            grdGanban.SetBorderAndGridlineStyles();
            grdGanban.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGanban.DefaultCellStyle.Font = new Font("맑은고딕", 15, FontStyle.Bold);
            grdGanban.RowTemplate.Height = 80;

            grdGanban.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 20F, FontStyle.Bold);
            grdGanban.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void InitGanbanListNONDP()
        {
            //                                   0               1               2                   3              4                 5                6                7                8               9           10           11             
            string[] headerText = new string[] { "사용여부", "간판라벨번호", "발주번호", "W/O", "FROM창고", "현재창고", "이동일자", "이동담당자", "구성수량", "생성자", "생성일자" }; //12
            string[] columnName = new string[] { "USEYN", "GANBANID", "DEPARTUREGROUPID", "WORKORDERID", "FROMLOCATIONCD", "LOCATIONCD", "MOVEDATE", "MOVEBY", "QTY", "NAME", "CREATEDATE" };
            string[] columnType = new string[] { "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T" };

            int[] columnWidth = new int[] { 150, 150, 250, 200, 250, 250, 250, 250, 150, 200, 250 };
            bool[] columnVisible = new bool[] { true, true, true, true, true, true, true, true, true, true, true };
            bool[] columnDisable = new bool[] { true, true, true, true, true, true, true, true, true, true, true };
            string[] cellAlign = new string[] { "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C" };

            grdGanban.SetBorderAndGridlineStyles();
            grdGanban.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGanban.DefaultCellStyle.Font = new Font("맑은고딕", 15, FontStyle.Bold);
            grdGanban.RowTemplate.Height = 80;

            grdGanban.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 20F, FontStyle.Bold);
            grdGanban.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void init_process()
        {
            lblAllQty.Text = "";
            lblDepartureGID.Text = "";
            txtSN.Text = "";
            _stockid = "";

            _itemDt.Rows.Clear();
            lblCtQty.Text = "";
            lblGanbanQty.Text = "";
            lblPossibleQty.Text = "";
            lblStock.Text = "";
            lblLabelID.Text = "";


            _ganHeadDt.Dispose();
            _ganHeadDt = new DataTable();
            _ganBodyDt.Dispose();
            _ganBodyDt = new DataTable();
            


            grdGanban.RemoveAll();

            txtSN_Focus();
        }

        private void txtSN_Leave(object sender, EventArgs e)
        {
            txtSN.BackColor = Color.Red;
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            txtSN.BackColor = Color.Yellow;
        }

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                ganban_main_process();
            }
        }

        private void ganban_main_process()
        {
            string ganbanType = ganbanCheck();

            if (ganbanType == "NODATA" || ganbanType == "")
            {
                frmMessage frm1 = new frmMessage("존재하지 않는 라벨정보입니다. 다시한번 확인하여 주세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganbanType == "SN")
            {
                frmMessage frm1 = new frmMessage("SN 라벨은 분할 할 수 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            _ganbanType = ganbanType;

            _sn = txtSN.Text;
            _fromDesc = "from " + _ganbanType;

            // DP, SMT, 수삽 구분
            // 해당 LABEL TEXT 및 그리드 설정 변경
            // DP : 원부자재 구분
            if (_ganbanType == "DP")
            {
                bntReprint.Enabled = true;
                _pa_ganban_id = txtSN.Text.Trim();
                InitGanbanListDP();
                wo_ganban_head_search();
                wo_ganban_body_search();
            }
            // NOT DP : SMT, 수삽
            else
            {
                label1.Text = "WORK ORDER ID";
                label6.Text = "계획 수량";
                InitGanbanListNONDP();
                wo_ganban_head_search();
                wo_ganban_body_search();
            }
            txtSN_Focus();
        }

        private void wo_ganban_body_search()
        {
            grdGanban.RemoveAll();

            string ct = "";
            string ganban = "";
            string depature = "";

            if (_ganbanType == "DP")
            {
                ganban = txtSN.Text.Trim();
                List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
                paramsMap1.Add("p_err_code", "");
                paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap1.Add("WORK_ORDER_ID", "");
                paramsMap1.Add("GANBAN_ID", ganban);
                paramsMap1.Add("DEPARTURE_GROUP_ID", depature);
                paramsMap1.Add("dateFlag", "");
                paramsMap1.Add("USE_YN", "Y");

                paramsList1.Add(paramsMap1);

                string retvalue = "";

                _ganBodyDt.Dispose();
                _ganBodyDt = new DataTable();
                _ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanBodyList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            } else
            {
                ct = txtSN.Text.Trim();
                List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
                paramsMap1.Add("p_err_code", "");
                paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap1.Add("WORK_ORDER_ID", _work_order_id);
                paramsMap1.Add("GANBAN_ID", ct);
                paramsMap1.Add("USE_YN", "Y");

                paramsList1.Add(paramsMap1);

                string retvalue = "";

                _ganBodyDt.Dispose();
                _ganBodyDt = new DataTable();
                _ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanBodyList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);
            }



            

            _makeqty = 0;
            if (_ganBodyDt == null)
            {
                lblGanbanQty.Text = _makeqty.ToString("###,##0.##");
                lblPossibleQty.Text = (double.Parse(lblAllQty.Text.Replace(",", "")) - double.Parse(lblGanbanQty.Text.Replace(",", "")) + _makeGanban).ToString("###,##0.##");
                return;
            }

            if (_ganBodyDt.Rows.Count == 0)
            {
                lblGanbanQty.Text = _makeqty.ToString("###,##0.##");
                lblPossibleQty.Text = (double.Parse(lblAllQty.Text.Replace(",", "")) - double.Parse(lblGanbanQty.Text.Replace(",", "")) + _makeGanban).ToString("###,##0.##");
                return;
            }
            
            grdGanban.DataBindDataSource(_ganBodyDt, false, false);
            _makeqty = 0;
            for (int i =0;i<_ganBodyDt.Rows.Count;i++)
            {
                if (_ganBodyDt.Rows[i]["USEYN"].ToString().Trim() == "Y")
                {
                    _makeqty += double.Parse(_ganBodyDt.Rows[i]["QTY"].ToString().Trim());
                }
            }
            lblGanbanQty.Text = _makeqty.ToString("###,##0.##");

            lblPossibleQty.Text = (double.Parse(lblAllQty.Text.Replace(",", "")) - double.Parse(lblGanbanQty.Text.Replace(",", ""))).ToString("###,##0.##");

        }

        private void wo_ganban_head_search()
        {
            string ct = "";
            string ganban = "";

            if (_ganbanType == "DP") {
                ganban = txtSN.Text.Trim();
            } else
            {
                ct = txtSN.Text.Trim();
            }

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);


            string retvalue = "";

            _ganHeadDt.Dispose();
            _ganHeadDt = new DataTable();

            if (_ganbanType == "DP")
            {
                paramsMap1.Add("GANBAN_ID", ganban);
                paramsList1.Add(paramsMap1);

                _ganHeadDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanHeadGanbanList_new.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);
            } else
            {
                paramsMap1.Add("LOTTYPE", _ganbanType);
                paramsMap1.Add("CT", ct);
                paramsList1.Add(paramsMap1);

                _ganHeadDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getCTHeadCTList_new.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);
            }

            if (_ganHeadDt == null)
            {
                return;
            }

            if (_ganHeadDt.Rows.Count == 0)
            {
                return;
            }

            if (_ganbanType == "DP")
            {
                lblDepartureGID.Text = _ganHeadDt.Rows[0]["DEPARTUREGROUPID"].ToString();
                lblLabelID.Text = _ganHeadDt.Rows[0]["POPGANBANLABELID"].ToString();
            } else
            {
                lblDepartureGID.Text = _ganHeadDt.Rows[0]["PRODUCTORDERID"].ToString();
                lblLabelID.Text = _ganHeadDt.Rows[0]["POPCTLABELID"].ToString();
            }
            
            _stockid      = _ganHeadDt.Rows[0]["SLOC"].ToString();
            lblStock.Text = _ganHeadDt.Rows[0]["SLOCNAME"].ToString() + "(" + _ganHeadDt.Rows[0]["SLOC"].ToString() + ")";
            
            lblCtQty.Text        = _ganHeadDt.Rows[0]["POPCTQTY"].ToString();
            _makeGanban          = double.Parse(lblCtQty.Text);
            _work_order_id       = _ganHeadDt.Rows[0]["WORKORDERID"].ToString();


            item_combo_bind();
        }

        private void item_combo_bind()
        {
            _itemDt.Dispose();

            _itemDt = new DataTable();
            _itemDt.Columns.Add("itemID");
            _itemDt.Columns.Add("itemName");

            _allqty = 0;
            string buf = "";
            for(int i=0;i<_ganHeadDt.Rows.Count;i++)
            {
                if(i==0)
                {
                    buf = _ganHeadDt.Rows[i]["ITEMID"].ToString();
                    _itemDt.Rows.Add(_ganHeadDt.Rows[i]["ITEMID"].ToString(), _ganHeadDt.Rows[i]["ITEMNAME"].ToString());
                }
                else
                {
                    if(buf != _ganHeadDt.Rows[i]["ITEMID"].ToString())
                    {
                        buf = _ganHeadDt.Rows[i]["ITEMID"].ToString();
                        _itemDt.Rows.Add(_ganHeadDt.Rows[i]["ITEMID"].ToString(), _ganHeadDt.Rows[i]["ITEMNAME"].ToString());
                    }
                }
                _allqty += double.Parse(_ganHeadDt.Rows[i]["GOODQTY"].ToString().Trim());
            }

            comboItem.DisplayMember = "itemName";
            comboItem.ValueMember = "itemID";
            comboItem.DataSource = _itemDt;

            comboItem.SelectedIndex = 0;

            lblAllQty.Text = _allqty.ToString("###,##0.##");
        }

        private string ganbanCheck()
        {
            if (txtSN.Text.Trim() == "")
            {
                return "NODATA";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_sloc", "");
            paramsMap.Add("p_ganbantype", "");
            paramsMap.Add("p_useyn", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD",  clsStatic._COMPANY_CD);
            paramsMap.Add("P_SN",          txtSN.Text.Trim());
            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable snDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbancheck_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (snDt == null)
            {
                frmMessage frm1 = new frmMessage("입력한 SN의 타입이 정상적으로 리턴되지 않았습니다!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return "NODATA";
            }

            if (snDt.Rows.Count == 0)
            {
                frmMessage frm2 = new frmMessage("입력한 SN의 타입이 정상적으로 리턴되지 않았습니다!", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return "NODATA";
            }

            string ganbanType = snDt.Rows[0]["p_ganbantype"].ToString();
            _useyn = snDt.Rows[0]["p_useyn"].ToString();

            return ganbanType;
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

        private void btnClose_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("간판라벨발행 화면을 종료 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                this.Close();
            }
        }
        
        private void btnLabelPrint_Click(object sender, EventArgs e)
        {
            insertGanban("NONE");
        }

        private void btnLabelPrintAll_Click(object sender, EventArgs e)
        {
            insertGanban("ALL");
        }
        
        private void insertGanban(string flag)
        {
            double makeBoxQty = double.Parse(lblCtQty.Text);

            if (makeBoxQty <= 0)
            {
                frmMessage frm1 = new frmMessage("박스구성 수량을 입력하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if ("N".Equals(_useyn))
            {
                frmMessage frm1 = new frmMessage("사용불가된 라벨 입니다.!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (double.Parse(lblAllQty.Text.Replace(",", "")) < makeBoxQty)
            {
                frmMessage frm1 = new frmMessage("분할 수량이 총 수량보다 많을 수 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string retbuf = "";
            retbuf = get_ganbanSeq();

            try {
                if (flag.Equals("NONE"))
                {
                    string remainder = (double.Parse(lblAllQty.Text.Replace(",", "")) - makeBoxQty).ToString("####0.##");
                    make_split_new(retbuf, makeBoxQty.ToString(), _sn);
                    
                    
                    if (double.Parse(remainder) > 0)
                    {
                        make_split_new(retbuf, remainder.ToString(), _sn);
                    }
                    
                }
                else
                {
                    double pollibleQty = double.Parse(lblAllQty.Text.Replace(",", ""));
                    int makeqty = Convert.ToInt32(System.Math.Truncate(pollibleQty / makeBoxQty));
                    double etc = pollibleQty % makeBoxQty;

                    for (int i = 0; i < makeqty; i++)
                    {
                        make_split_new(retbuf, makeBoxQty.ToString(), _sn);
                        Thread.Sleep(500);
                    }

                    if (etc > 0)
                    {
                        make_split_new(retbuf, etc.ToString(), _sn);
                    }
                }

                ganban_print_new(retbuf);

            } catch (Exception ex)
            {
                delete_temp(retbuf, "GANBAN");
                frmMessage frm1 = new frmMessage("라벨 발행에 실패 했습니다. 잠시 후 다시 시도 하세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
            }

            wo_ganban_head_search();
            wo_ganban_body_search();

            txtSN_Focus();

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

        private void make_split(string qty, string paganban)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ganbanid", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_WORK_ORDER_ID", "");
            paramsMap.Add("P_GANBANTYPE", "DP");
            paramsMap.Add("P_GOOD_QTY", qty);
            paramsMap.Add("P_DESCRIPTION", "from SPLIT");
            paramsMap.Add("P_PA_GANBAN_ID", paganban);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbansplit_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            ganban_print(ganbanAddDt.Rows[0]["p_ganbanid"].ToString());
        }

        private void make_split_new(string labelid, string qty, string paganban)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ganbanid", "");
            paramsMap.Add("P_LABEL_ID", labelid);
            paramsMap.Add("P_IP_ADDRESS", clsStatic._GANBANPRINT);
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_WORK_ORDER_ID", "");
            paramsMap.Add("P_GOOD_QTY", qty);
            paramsMap.Add("P_DESCRIPTION", "from SPLIT");
            paramsMap.Add("P_PA_GANBAN_ID", paganban);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbansplit_proc_new.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (ganbanAddDt == null)
            {
                frmMessage frm1 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows[0]["p_err_code"].ToString().Equals("ERROR"))
            {
                throw new Exception();
            }
        }

        private void make_ganban(string makeGanban, string itemId, string materialdepartureId)
        {
            string pallet = "";
            string ct = "";
            string ganban = "";
            string depature = "";

            pallet = "-";
            ct = "-";
            ganban = "-";
            depature = materialdepartureId;

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ganbanid", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_ITEM_ID", itemId);
            paramsMap.Add("P_DEPARTURE_GROUP_ID", depature);
            paramsMap.Add("P_WORK_ORDER_ID", "");
            paramsMap.Add("P_GANBANTYPE", "DP");
            paramsMap.Add("P_GOOD_QTY", makeGanban);
            paramsMap.Add("P_FROM_SLOC", "");
            paramsMap.Add("P_SLOC", clsStatic._TOLINE);
            paramsMap.Add("P_VENDOR_CD", "");
            paramsMap.Add("P_DESCRIPTION", "from DEPATURE");
            paramsMap.Add("P_PA_GANBAN_ID", ganban);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbaninsert_proc_new.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (ganbanAddDt == null)
            {
                frmMessage frm1 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            ganban_print(ganbanAddDt.Rows[0]["p_ganbanid"].ToString());
        }

        private void ganban_print(string ganbanid)
        {
            clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", "", ganbanid, "", ref _BasicDs);
        }

        private void ganban_print_new(string labelid)
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
                frmMessage frm1 = new frmMessage("출력할 간판라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (checkDt.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("출력할 간판라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (_ganbanType == "DP")
            {
                for (int i = 0; i < checkDt.Rows.Count; i++)
                {
                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", "", checkDt.Rows[i]["GANBANID"].ToString(), "", ref _BasicDs);
                }
            } else
            {
                for (int i = 0; i < checkDt.Rows.Count; i++)
                {
                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", checkDt.Rows[i]["GANBANID"].ToString(), "", "", ref _BasicDs);
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

        private void lblCtQty_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(lblCtQty.Text);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                _makeGanban = double.Parse(clsStatic._dialogValue);

                lblCtQty.Text = double.Parse(clsStatic._dialogValue).ToString("###,##0.##");
                clsStatic._dialogValue = "";
            }
        }

        private void bntReprint_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("간판라벨을 재발행 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (grdGanban.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("선택된라벨 정보가 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (result == DialogResult.OK)
            {
                int selectedRow = grdGanban.CurrentRow.Index;

                ganban_print(grdGanban["간판라벨번호", selectedRow].Value.ToString());
            }

            txtSN_Focus();
        }

        private void frmGanban_Load(object sender, EventArgs e)
        {

        }

        private string get_ganbanSeq()
        {
            string retvalue = "";
            string retbuf = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("IP_ADDRESS", clsStatic._GANBANPRINT);

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

    }
}
