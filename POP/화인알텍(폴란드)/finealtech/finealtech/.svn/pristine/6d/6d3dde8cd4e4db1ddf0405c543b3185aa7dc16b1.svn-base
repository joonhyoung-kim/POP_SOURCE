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
    public partial class frmLabelPrint : Form
    {
        DataTable _lineDt = new DataTable();
        DataTable _wostateDt = new DataTable();
        public frmLabelPrint()
        {
            InitializeComponent();

            
            grdMain_InitLabelList();


            _lineDt = clsStatic.getBORInfo();
            _wostateDt = clsStatic.getComCodeListInfo("WORK_ORDER_STATE", "", "", "");

            DataRow drLine = _lineDt.NewRow();
            drLine["NAME"] = "ALL";
            _lineDt.Rows.InsertAt(drLine, 0);

            comboLine.DisplayMember = "NAME";
            comboLine.ValueMember = "RESOURCECD";
            comboLine.DataSource = _lineDt;

            DataRow drState = _wostateDt.NewRow();
            drState["CODENAME"] = "ALL";
            _wostateDt.Rows.InsertAt(drState, 0);

            comboWO.DisplayMember = "CODENAME";
            comboWO.ValueMember = "CODE";
            comboWO.DataSource = _wostateDt;

            radioUnPrint.Checked = true;

        }

        private void grdMain_InitLabelList()
        {
            //                                   0                1              2                3             4                5          6             7                8             9             10           11              12            13              14                  15            16          17            18                19         20         21          22          23           
            string[] headerText = new string[] { "PLAN DATE",     "W/O STATE",   "W/O",           "Line",       "Line Name",     "P/N",     "P/N Desc.",  "SPEC",          "PLAN QTY",   "PROD QTY",   "BAD QTY",   "CANCEL QTY",   "REMAIN QTY", "S/N COUNT",    "GANBAN COUNT",     "W/O START",  "W/O END",  "SNLABELID",  "GANBANLABELID",  "WOCODE",  "IDRULE",  "ITEMTYPE", "CTQTY",    "POPINPUTTYPE",   "GANBANLBLTYPE", "LGE ItemId", "IDRULE" }; //23
            string[] columnName = new string[] { "PLANSTARTTIME", "WOSTATEDESC", "WORKORDERID",   "RESOURCECD", "RESOURCENAME",  "ITEMID",  "ITEMNAME",   "SPECIFICATION", "CONFIRMQTY", "GOODQTY",    "BADQTY",    "CANCELQTY",    "REMAINQTY",  "SNALLCOUNT",   "GANBANALLCOUNT",   "STARTTIME",  "ENDTIME",  "SNLABELID",  "GANBANLABELID",  "WOSTATE", "IDRULE",  "ITEMTYPE", "POPCTQTY", "POPINPUTTYPE",   "GANBANLBLTYPE", "LGEITEMID",  "IDRULE" };
                                                                  
            string[] columnType = new string[] { "T",             "T",           "T",             "T",          "T",             "T",       "T",          "T",             "T",          "T",          "T",          "T",           "T",          "T",            "T",                "T",          "T",        "T",          "T",              "T",       "T",       "T",        "T",         "T",             "T",              "T",          "T"};
            int[] columnWidth    = new int[]   { 100,             90,            127,             80,           123,             160,       230,          200,             110,          110,          110,          110,           110,          110,            100,                173,          173,        100,          100,              70,        70,        70,         70,          70 ,             70,               120,          70};
            bool[] columnVisible = new bool[]  { true,            true,          true,            true,         true,            true,      true,         true,            true,         true,         true,         true,          true,         true,           true,               true,         true,       true,         true,             true,      true,      true,       true,        true,            true,            true,          true};
            bool[] columnDisable = new bool[]  { true,            true,          true,            true,         true,            true,      true,         true,            true,         true,         true,         true,          true,         true,           true,               true,         true,       true,         true,             true,      true,      true,       true,        true,            true,             true,         true};
            string[] cellAlign = new string[]  { "C",             "C",           "C",             "C",          "L",             "L",       "L",          "L",             "R",          "R",          "R",          "R",           "R",          "R",            "R",                "C",          "C",        "C",          "C",              "C",       "C",       "C",        "C",         "C",             "C",              "C",          "C"};

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 10F);
            grdMain.RowTemplate.Height = 36;
            //grdMain.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 10F);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void btnSearch_Click(object sender, EventArgs e)
        {
            label_search();
            grdMain_Color_change();
        }

        private void label_search()
        {
            string print_flag = "ALL";

            if(radioPrint.Checked == true)
            {
                print_flag = "PRINT";
            }
            else if (radioUnPrint.Checked == true)
            {
                print_flag = "UNPRINT";
            }

            string startdate = dateFrom.Value.ToString("yyyy-MM-dd");
            string enddate = dateTo.Value.ToString("yyyy-MM-dd");
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD",  clsStatic._COMPANY_CD);
            paramsMap.Add("WORK_ORDER_ID", txtWO.Text.Trim());
            paramsMap.Add("RESOURCE_CD", comboLine.SelectedValue.ToString());
            paramsMap.Add("WO_STATE", comboWO.SelectedValue.ToString());
            paramsMap.Add("ITEM_ID", txtItem.Text.Trim());
            paramsMap.Add("PRINT_FLAG", print_flag);
            paramsMap.Add("STARTDATE", startdate);
            paramsMap.Add("ENDDATE",   enddate);
            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable woDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganbanlabel_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            for(int i=0;i<woDt.Rows.Count;i++)
            {
                woDt.Rows[i]["CONFIRMQTY"]       = woDt.Rows[i]["CONFIRMQTY"].ToString().Trim();
                woDt.Rows[i]["GOODQTY"]          = woDt.Rows[i]["GOODQTY"].ToString().Trim();
                woDt.Rows[i]["BADQTY"]           = woDt.Rows[i]["BADQTY"].ToString().Trim();
                woDt.Rows[i]["CANCELQTY"]        = woDt.Rows[i]["CANCELQTY"].ToString().Trim();
                woDt.Rows[i]["REMAINQTY"]        = woDt.Rows[i]["REMAINQTY"].ToString().Trim();
                woDt.Rows[i]["GANBANALLCOUNT"]   = woDt.Rows[i]["GANBANALLCOUNT"].ToString().Trim();
                woDt.Rows[i]["SNALLCOUNT"]       = woDt.Rows[i]["SNALLCOUNT"].ToString().Trim();
            }

            grdMain.DataBindDataSource(woDt, false, false);
        }

        private void grdMain_Color_change()
        {
            string woState = "";

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                woState = grdMain["WOCODE", i].Value.ToString();

                Color colorValue = Color.Black;
                bool colorFlag = false;
                if (woState == "C")
                {
                    colorValue = Color.Silver;
                    colorFlag = true;

                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.Font = new Font("맑은고딕", 10F, FontStyle.Italic);
                    }
                }
                else if (woState == "T")
                {
                    colorValue = Color.CornflowerBlue;
                    colorFlag = true;
                }
                else if (woState == "R")
                {
                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.Font = new Font("맑은고딕", 10F, FontStyle.Bold);
                    }

                    colorValue = Color.DarkOrange;
                    colorFlag = true;
                }

                if (colorFlag == true)
                {
                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.BackColor = colorValue;
                    }
                }

                string ganbanCount = grdMain["GANBAN COUNT", i].Value.ToString().Trim().Replace(",", "");
                string snCount = grdMain["S/N COUNT", i].Value.ToString().Replace(",", "");

                if(ganbanCount == "")
                {
                    ganbanCount = "0";
                }

                if (snCount == "")
                {
                    snCount = "0";
                }

                if(int.Parse(ganbanCount.Replace(",", "")) > 0 || int.Parse(snCount.Replace(",", "")) > 0)
                {
                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Red;
                    }
                }
            }
        }

        private void grdMain_CellDoubleClick(object sender, DataGridViewCellEventArgs e)
        {
            int columnIndex = ((ExGrid)sender).CurrentCell.ColumnIndex;
            int rowIndex = ((ExGrid)sender).CurrentRow.Index;

            if (rowIndex >= 0)
            {
                string resourceId    = grdMain.Rows[rowIndex].Cells["Line"].Value.ToString().Trim();
                string resorceName   = grdMain.Rows[rowIndex].Cells["Line Name"].Value.ToString().Trim();
                string pn            = grdMain.Rows[rowIndex].Cells["P/N"].Value.ToString().Trim();
                string pndesc        = grdMain.Rows[rowIndex].Cells["P/N Desc."].Value.ToString().Trim();
                string spec          = grdMain.Rows[rowIndex].Cells["SPEC"].Value.ToString().Trim();
                string plandate      = grdMain.Rows[rowIndex].Cells["PLAN DATE"].Value.ToString().Trim();
                string wo            = grdMain.Rows[rowIndex].Cells["W/O"].Value.ToString().Trim();
                string planqty       = grdMain.Rows[rowIndex].Cells["PLAN QTY"].Value.ToString().Trim();
                string wocode        = grdMain.Rows[rowIndex].Cells["WOCODE"].Value.ToString().Trim();
                string idrule        = grdMain.Rows[rowIndex].Cells["IDRULE"].Value.ToString().Trim();
                string labelId       = grdMain.Rows[rowIndex].Cells["SNLABELID"].Value.ToString().Trim();
                string ganbanId      = grdMain.Rows[rowIndex].Cells["GANBANLABELID"].Value.ToString().Trim();
                string itemtype      = grdMain.Rows[rowIndex].Cells["ITEMTYPE"].Value.ToString().Trim();
                string ctqty         = grdMain.Rows[rowIndex].Cells["CTQTY"].Value.ToString().Trim();
                string inputtype     = grdMain.Rows[rowIndex].Cells["POPINPUTTYPE"].Value.ToString().Trim();
                string glabeltype    = grdMain.Rows[rowIndex].Cells["GANBANLBLTYPE"].Value.ToString().Trim();
                string lgitemid      = grdMain.Rows[rowIndex].Cells["LGE ItemId"].Value.ToString().Trim();

                frmLabelPrintDetail frm = new frmLabelPrintDetail(resourceId, resorceName, pn, pndesc, spec, plandate, wo, planqty, ganbanId, labelId, wocode, idrule, itemtype, ctqty, inputtype, glabeltype, lgitemid);
                frm.ShowDialog();
            }

            
        }
    }
}
