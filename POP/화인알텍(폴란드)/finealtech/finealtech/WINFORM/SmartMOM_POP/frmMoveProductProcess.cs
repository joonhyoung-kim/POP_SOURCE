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
        ucMoveProductItemStatus _ucMoveProductItemStatus;
        ucMoveProductItemAction _ucMoveProductItemAction;

        public frmMoveProductProcess(string fromline, string toline, string itemtype, string movetype, string palletid)
        {
            InitializeComponent();


            if (clsStatic._STOCK_TYPE == "MAT")
            {
                btnMove.Text = "공정재고이동";
                btnStatus.Text = "From창고재고현황";
            }
            else if (clsStatic._STOCK_TYPE == "MAT")
            {
                btnMove.Text = "자재반납";
                btnStatus.Text = "From창고재고현황";
            }
            else if (clsStatic._STOCK_TYPE == "MAT")
            {
                btnMove.Text = "공정재고이동";
                btnStatus.Text = "From창고재고현황";
            }
            else if (clsStatic._STOCK_TYPE == "MAT")
            {
                btnMove.Text = "제품이동";
                btnStatus.Text = "From창고재고현황";
            }

            _ucMoveProductItemAction = new ucMoveProductItemAction(palletid);
            _ucMoveProductItemStatus = new ucMoveProductItemStatus();

            pnlMain.Controls.Add(_ucMoveProductItemStatus);
            pnlMain.Controls.Add(_ucMoveProductItemAction);

            _ucMoveProductItemStatus.Dock = DockStyle.Fill;
            _ucMoveProductItemAction.Dock = DockStyle.Fill;

            lblFrom.Text = "From : " + fromline;
            lblTo.Text = "To : " + toline;
            _palletid = palletid;

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

            frmMessage frm = new frmMessage("공정이동 화면을 종료 하시겠습니까?", "OK_CANCEL");
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
        }

        private void btnStatus_Click(object sender, EventArgs e)
        {
            btnMove.BackColor = Color.DarkGray;
            btnStatus.BackColor = Color.Orange;

            _ucMoveProductItemStatus.Visible = true;
            _ucMoveProductItemAction.Visible = false;
        }

    }
}
