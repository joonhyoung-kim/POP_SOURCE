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
    public partial class frmCTReprint : Form
    {
        string _ct = "";
        string _gtType = "";
        string _ctType = "";
        DataTable _gt_DesignDt = new DataTable();
        DataTable _ct_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();
        public frmCTReprint(DataTable dt, string gtType, string ctType, DataTable gt_DesignDt, DataTable ct_DesignDt, DataSet BasicDs)
        {
            InitializeComponent();

            _gtType = gtType;
            _ctType = ctType;
            _gt_DesignDt = gt_DesignDt;
            _ct_DesignDt = ct_DesignDt;

            InitCTList();

            grdCT.DataBindDataSource(dt, false, false);
        }

        private void InitCTList()
        {
            //                                   0                         
            string[] headerText = new string[] {  "박스포장번호", "구성수량"        }; //2
            string[] columnName = new string[] { "CT",            "CTCOUNT"         };
            string[] columnType = new string[] {  "T",            "T"               };
                                                              
            int[] columnWidth    = new int[]   { 700,             300               };
            bool[] columnVisible = new bool[]  {  true,           true              };
            bool[] columnDisable = new bool[]  {  true,           true              };
            string[] cellAlign = new string[]  {  "C",            "C"               };

            grdCT.SetBorderAndGridlineStyles();
            grdCT.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdCT.DefaultCellStyle.Font = new Font("맑은고딕", 24F, FontStyle.Bold);
            grdCT.RowTemplate.Height = 120;
            grdCT.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            grdCT.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdCT.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnUp_Click(object sender, EventArgs e)
        {
            int rowindex = grdCT.CurrentRow.Index;
            grid_move(rowindex, "UP");
        }

        private void btnDown_Click(object sender, EventArgs e)
        {
            int rowindex = grdCT.CurrentRow.Index;
            grid_move(rowindex, "DOWN");
        }

        private void grid_move(int rowindex, string movetype)
        {
            if (movetype == "DOWN")
            {
                rowindex++;
                if (rowindex >= grdCT.Rows.Count)
                {
                    rowindex = 0;
                }
            }
            else if (movetype == "UP")
            {
                rowindex--;
                if (rowindex < 0)
                {
                    rowindex = grdCT.Rows.Count - 1;
                }
            }
            grdCT.CurrentCell = grdCT.Rows[rowindex].Cells[0];
            _ct = grdCT.Rows[rowindex].Cells["박스포장번호"].Value.ToString();
        }

        private void grdCT_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int columnIndex = ((ExGrid)sender).CurrentCell.ColumnIndex;
            int rowIndex = ((ExGrid)sender).CurrentRow.Index;

            if (rowIndex >= 0)
            {
                _ct = grdCT.Rows[rowIndex].Cells["박스포장번호"].Value.ToString();
            }
        }

        private void btnPrint_Click(object sender, EventArgs e)
        {
            if(_ct == "")
            {
                frmMessage frm1 = new frmMessage("먼저 박스번호를 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }
            frmBadProductInsert frm = new frmBadProductInsert("박스라벨 재발행", "", _ct, "CT", clsStatic._MACADDRESS, _gtType, _ctType, _gt_DesignDt, _ct_DesignDt, _BasicDs);
            frm.ShowDialog();
        }
    }
}
