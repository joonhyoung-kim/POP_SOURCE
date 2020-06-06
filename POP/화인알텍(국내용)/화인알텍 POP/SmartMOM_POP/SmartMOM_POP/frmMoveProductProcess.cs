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
    public partial class frmMoveProductProcess : Form
    {
        string move_type = "";
        string _palletid = "";
        string _productorderid = "";
        ucMoveProductItemStatus _ucMoveProductItemStatus;
        ucMoveProductItemAction _ucMoveProductItemAction;

        public frmMoveProductProcess(string fromline, string toline, string itemtype, string movetype, string palletid, string productorderid)
        {
            InitializeComponent();


            if (clsStatic._STOCK_TYPE == "MAT")
            {
                btnMove.Text = "공정재고이동";
                btnStatus.Text = "From창고재고현황";
            }
            else if (clsStatic._STOCK_TYPE == "MRTN")
            {
                btnMove.Text = "자재반납";
                btnStatus.Text = "From창고재고현황";
            }
            else if (clsStatic._STOCK_TYPE == "WO")
            {
                btnMove.Text = "공정재고이동";
                btnStatus.Text = "From창고재고현황";
            }
            else if (clsStatic._STOCK_TYPE == "SO")
            {
                btnMove.Text = "제품이동";
                btnStatus.Text = "From창고재고현황";
            }

            btnMove.Text = clsStatic._STOCK_TYPE_NAME;

            _ucMoveProductItemAction = new ucMoveProductItemAction(palletid, productorderid);
            _ucMoveProductItemStatus = new ucMoveProductItemStatus();

            pnlMain.Controls.Add(_ucMoveProductItemStatus);
            pnlMain.Controls.Add(_ucMoveProductItemAction);

            _ucMoveProductItemStatus.Dock = DockStyle.Fill;
            _ucMoveProductItemAction.Dock = DockStyle.Fill;

            lblFrom.Text = "From : " + fromline;
            lblTo.Text = "To : " + toline;
            _palletid = palletid;

            if (clsStatic._moveitemDt == null)
            {
                clsStatic.getComCodeListInfo("ITEM_TYPE", "");
            }
            else if (clsStatic._moveitemDt.Rows.Count == 0)
            {
                clsStatic.getComCodeListInfo("ITEM_TYPE", "");
            }

            _ucMoveProductItemStatus.Visible = false;
            _ucMoveProductItemAction.Visible = true;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            if(_palletid != "")
            {
                this.Close();
                return;
            }

            frmMessage frm = new frmMessage(clsStatic._STOCK_TYPE_NAME + " 화면을 종료 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                this.Close();
            }
        }

        private void btnMove_Click(object sender, EventArgs e)
        {
            btnMove.BackColor = Color.Orange;
            btnStatus.BackColor = Color.DarkGray;

            _ucMoveProductItemStatus.Visible = false;
            _ucMoveProductItemAction.Visible = true;

            _ucMoveProductItemStatus.Focus();
        }

        private void btnStatus_Click(object sender, EventArgs e)
        {
            btnMove.BackColor = Color.DarkGray;
            btnStatus.BackColor = Color.Orange;

            _ucMoveProductItemStatus.Visible = true;
            _ucMoveProductItemAction.Visible = false;
            _ucMoveProductItemAction.Focus();
        }

    }
}
