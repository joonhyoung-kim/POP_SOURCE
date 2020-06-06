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
    public partial class frmScale : Form
    {
        string _wo = "";
        string _item_id = "";
        string _sn = "";

        public frmScale(string wo, string item_id, string sn)
        {
            InitializeComponent();

            _wo = wo;
            _item_id = item_id.ToUpper();
            _sn = sn;

            InitLabelList();
            scale_search();
        }

        private void scale_search()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("WORKORDERID", _wo);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable scaleDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_requestScale.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            grdMain.DataBindDataSource(scaleDt, false, false);
            if(scaleDt.Rows.Count > 0)
            {
                grdMain.CurrentCell = grdMain.Rows[0].Cells[0];
                label_bind_process(0);
            }
        }

        private void label_bind_process(int rownum)
        {
            lblItem.Text = grdMain.Rows[rownum].Cells["품번"].Value.ToString() + " / " + grdMain.Rows[rownum].Cells["품명"].Value.ToString() + " / " + grdMain.Rows[rownum].Cells["소요량(g)"].Value.ToString();
            string scalevalue = grdMain.Rows[rownum].Cells["측정량(g)"].Value.ToString();
            if(scalevalue.Trim() == "")
            {
                scalevalue = "0";
            }
            lblScale.Text = double.Parse(scalevalue).ToString("###,##0") + "g";
        }

        private void InitLabelList()
        {
            //                                   0               1                2       3             4                                   
            string[] headerText = new string[] {  "품번",        "품명",          "단위", "소요량(g)",     "측정량(g)"     }; //5
            string[] columnName = new string[] {  "ITEMID",      "ITEMNAME",      "UNIT", "QTY",        "SCALEVALUE" };
            string[] columnType = new string[] {  "T",           "T",             "T",    "T",          "T"          };
                                                                  
            int[] columnWidth    = new int[]   {  465,           280,             77,     150,          150          };
            bool[] columnVisible = new bool[]  {  true,          true,            false,   true,         true         };
            bool[] columnDisable = new bool[]  {  true,          true,            true,   true,         true         };
            string[] cellAlign = new string[]  {  "L",           "L",             "C",    "R",          "R"          };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 24F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 80;
            grdMain.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage($"저울 측정 작업을 중단 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                this.Close();
            }
        }

        private void btnUp_Click(object sender, EventArgs e)
        {
            int rowindex = grdMain.CurrentRow.Index;
            grid_move(rowindex, "UP");
        }

        private void btnDown_Click(object sender, EventArgs e)
        {
            int rowindex = grdMain.CurrentRow.Index;
            grid_move(rowindex, "DOWN");
        }

        private void grid_move(int rowindex, string movetype)
        {
            if (movetype == "DOWN")
            {
                rowindex++;
                if (rowindex >= grdMain.Rows.Count)
                {
                    rowindex = 0;
                }
            }
            else if (movetype == "UP")
            {
                rowindex--;
                if (rowindex < 0)
                {
                    rowindex = grdMain.Rows.Count - 1;
                }
            }
            grdMain.CurrentCell = grdMain.Rows[rowindex].Cells[0];
            label_bind_process(rowindex);
        }

        private void serialScale_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            string readvalue = serialScale.ReadLine();
            readvalue = readvalue.Replace(" ", "").Replace("g\r", "");

            this.Invoke(new MethodInvoker(delegate ()
                {
                    if (clsStatic._WORK_ORDER_ID != "")
                    {
                        string showvalue = int.Parse(readvalue).ToString("###,##0");

                        frmMessage frm = new frmMessage(showvalue + "g", "AUTOCLOSE", 1);
                        frm.ShowDialog();

                        int rowindex = grdMain.CurrentRow.Index;
                        double buf = double.Parse(grdMain.Rows[rowindex].Cells["측정량(g)"].Value.ToString());
                        grdMain.Rows[rowindex].Cells["측정량(g)"].Value = (buf + double.Parse(readvalue)).ToString();
                        grid_move(rowindex, "DOWN");

                        sum_process();
                    }
                }
            ));

        }

        private void sum_process()
        {
            double tmpSum = 0;
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string scalevalue = grdMain.Rows[i].Cells["측정량(g)"].Value.ToString();

                try
                {
                    tmpSum += double.Parse(scalevalue);
                }
                catch
                {

                }
            }
            lblSum.Text = tmpSum.ToString() + "g";
        }

        private string create_scale_proc(string child_item_id, string measure, string flag)
        {
            string retbuf = "OK";

            string retvalue = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("p_err_msg", "");
            paramsCheckMap.Add("p_runCount", "");
            paramsCheckMap.Add("P_SN",            _sn);
            paramsCheckMap.Add("P_DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsCheckMap.Add("P_COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsCheckMap.Add("P_WORK_ORDER_ID", _wo);
            paramsCheckMap.Add("P_ITEM_ID",       child_item_id);
            paramsCheckMap.Add("P_MEASURE",       measure);
            paramsCheckMap.Add("P_FLAG",          flag);
            paramsCheckMap.Add("P_CREATE_BY",     clsStatic._USER_ID);

            paramsCheckList.Add(paramsCheckMap);

            DataTable result = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_scale_proc.dummy", paramsCheckList, clsStatic._serviceUsertURL, ref retvalue);

            if (result == null)
            {
                frmMessage frm1 = new frmMessage("실행중 오류가 발생하였습니다. 다시 시도 해주십시오.", "AUTOCLOSE");
                frm1.ShowDialog();
                retbuf = "NG";
            }
            if (result.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("실행중 오류가 발생하였습니다. 다시 시도 해주십시오.", "AUTOCLOSE");
                frm1.ShowDialog();
                retbuf = "NG";
            }
            if (result.Rows[0]["p_err_code"].ToString() != "OK")
            {
                frmMessage frm1 = new frmMessage(result.Rows[0]["p_err_msg"].ToString(), "AUTOCLOSE");
                frm1.ShowDialog();
                retbuf = "NG";
            }

            return retbuf;
        }

        private void frmScale_FormClosed(object sender, FormClosedEventArgs e)
        {
            if(serialScale.IsOpen == true)
            {
                serialScale.Close();
            }
        }

        private void frmScale_Load(object sender, EventArgs e)
        {
            if (clsStatic._PUSHBUTTON1.IndexOf("COM") == 0)
            {
                try
                {
                    serialScale.PortName = clsStatic._PUSHBUTTON1;
                    serialScale.Open();
                }
                catch (Exception ex)
                {
                    string aaa = ex.ToString();
                }
            }
        }

        private void btnScaleSave_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string scalevalue = grdMain.Rows[i].Cells["측정량(g)"].Value.ToString();

                if (scalevalue.Trim() == "" || scalevalue.Trim() == "0")
                {
                    frmMessage frm = new frmMessage($"측정이 안되어 있는 품목이 있습니다. 그래도 측정 데이터를 저장할까요?", "OK_CANCEL");
                    DialogResult result = frm.ShowDialog();

                    if (result == DialogResult.Cancel)
                    {
                        return;
                    }
                    else
                    {
                        break;
                    }
                }
            }

            string errvalue = "";
            for (int i=0;i<grdMain.Rows.Count;i++)
            {
                errvalue = "";
                string scalevalue = grdMain.Rows[i].Cells["측정량(g)"].Value.ToString();
                string child_item_id = grdMain.Rows[i].Cells["품번"].Value.ToString();
                if(scalevalue != "0")
                {
                    errvalue = create_scale_proc(child_item_id, scalevalue, "INS");
                    System.Threading.Thread.Sleep(10);
                }

                if(errvalue == "NG")
                {
                    create_scale_proc("", scalevalue, "DEL");
                    return;
                }
            }

            clsStatic._dialogValue = lblSum.Text.Replace("g", "");
            this.Close();
        }

        private void btnSelectScaleInit_Click(object sender, EventArgs e)
        {
            int rowindex = grdMain.CurrentRow.Index;

            frmMessage frm = new frmMessage($"선태한 품목(" + grdMain.Rows[rowindex].Cells["품번"].Value.ToString() + " / " + grdMain.Rows[rowindex].Cells["품명"].Value.ToString() + " / " + grdMain.Rows[rowindex].Cells["측정량(g)"].Value.ToString() + ") 측량을 초기화 하겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.Cancel)
            {
                return;
            }

            grdMain.Rows[rowindex].Cells["측정량(g)"].Value = "0";
        }

        private void btnAllScaleInit_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage($"전체 리스트의 측량을 초기화 하겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.Cancel)
            {
                return;
            }

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                    grdMain.Rows[i].Cells["측정량(g)"].Value = "0";
            }
        }

        private void lblSum_Click(object sender, EventArgs e)
        {
            grdMain.Rows[0].Cells["측정량(g)"].Value = "1000";
            grdMain.Rows[1].Cells["측정량(g)"].Value = "2000";
            grdMain.Rows[2].Cells["측정량(g)"].Value = "3000";

            sum_process();
        }
    }
}
