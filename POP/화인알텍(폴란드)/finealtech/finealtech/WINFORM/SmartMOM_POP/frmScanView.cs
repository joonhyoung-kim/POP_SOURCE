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
    public partial class frmScanView : Form
    {
        public frmScanView(DataTable dt, string flag)
        {
            InitializeComponent();

            if (flag == "자재입고")
            {
                InitGRGridList();
            }
            if (flag == "불출")
            {
                InitGIGridList();
            }

            grdMain.DataBindDataSource(dt, false, false); ;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void InitGRGridList()
        {
            //                                   0            1            2              
            string[] headerText = new string[] { "간판번호",  "구성수량",  "출발처리번호"     }; 
            string[] columnName = new string[] { "GANBANID",  "SCANQTY",    "DEPARTUREGROUPID" };
            string[] columnType = new string[] { "T",         "T",         "T"                };
                                                                                              
            int[] columnWidth    = new int[]   {  200,         200,         235               };
            bool[] columnVisible = new bool[]  {  true,        true,        true              };
            bool[] columnDisable = new bool[]  {  true,        true,        true              };
            string[] cellAlign = new string[]  { "C",         "C",         "C"                };
                                                                                                                                                                                                  
            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 18);
            grdMain.DefaultCellStyle.ForeColor = Color.Black;
            grdMain.RowTemplate.Height = 70;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 19, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void InitGIGridList()
        {
            //                                   0            1            2              
            string[] headerText = new string[] { "간판번호",  "구성수량",  "이동창고ID"       }; 
            string[] columnName = new string[] { "GANBANID",  "SCANQTY",    "TOLINE"          };
            string[] columnType = new string[] { "T",         "T",         "T"                };
                                                                                              
            int[] columnWidth    = new int[]   {  200,         200,         235               };
            bool[] columnVisible = new bool[]  {  true,        true,        true              };
            bool[] columnDisable = new bool[]  {  true,        true,        true              };
            string[] cellAlign = new string[]  { "C",         "C",         "C"                };
                                                                                                                                                                                                  
            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 18);
            grdMain.DefaultCellStyle.ForeColor = Color.Black;
            grdMain.RowTemplate.Height = 70;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 19, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }
    }
}
