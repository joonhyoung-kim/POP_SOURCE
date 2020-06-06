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
        string _move_type = "";
        string _palletid = "";
        ucMoveProductItemStatus _ucMoveProductItemStatus;
        ucMoveProductItemActionNew _ucMoveProductItemAction;

        public frmMoveProductProcess(string fromline, string toline, string itemtype, string movetype, string palletid)
        {
            InitializeComponent();

            _move_type = movetype;
            if (clsStatic._STOCK_TYPE == "MAT")
            {
                btnMove.Text = "재고이동";
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
            else if (clsStatic._STOCK_TYPE == "STATE")
            {
                btnMove.Visible = false;
                btnStatus.Text = "창고재고현황";
                btnStatus.Enabled = false;
            }

            _ucMoveProductItemAction = new ucMoveProductItemActionNew(palletid);
            _ucMoveProductItemStatus = new ucMoveProductItemStatus();

            pnlMain.Controls.Add(_ucMoveProductItemStatus);
            pnlMain.Controls.Add(_ucMoveProductItemAction);

            _ucMoveProductItemStatus.Dock = DockStyle.Fill;
            _ucMoveProductItemAction.Dock = DockStyle.Fill;

            if (clsStatic._STOCK_TYPE == "STATE")
            {
                lblFrom.Text = "From : " + fromline;
                lblTo.Text = "To : -";
                //_palletid = palletid;

                _ucMoveProductItemStatus.Visible = true;
                _ucMoveProductItemAction.Visible = false;
            }
            else
            {
                lblFrom.Text = "From : " + fromline;
                lblTo.Text = "To : " + toline;
                _palletid = palletid;

                _ucMoveProductItemStatus.Visible = false;
                _ucMoveProductItemAction.Visible = true;

                this.ActiveControl = _ucMoveProductItemAction.txtSN;
            }

            
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            if(_palletid != "")
            {
                this.Close();
                return;
            }

            frmMessage2 frm = new frmMessage2(_move_type + " 화면을 종료 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                this.Close();
            }
        }

        /// <summary>
        /// 재고이동
        /// </summary>
        private void btnMove_Click(object sender, EventArgs e)
        {
            btnMove.BackColor = Color.Orange;
            btnStatus.BackColor = Color.DarkGray;

            _ucMoveProductItemStatus.Visible = false;
            _ucMoveProductItemAction.Visible = true;

            
            _ucMoveProductItemAction.txtSN.Clear();
            _ucMoveProductItemAction.txtSN.BackColor = Color.Yellow;
            this.ActiveControl = _ucMoveProductItemAction.txtSN;
        }

        /// <summary>
        /// 재고현황
        /// </summary>
        private void btnStatus_Click(object sender, EventArgs e)
        {
            btnMove.BackColor = Color.DarkGray;
            btnStatus.BackColor = Color.Orange;

            _ucMoveProductItemStatus.Visible = true;
            _ucMoveProductItemAction.Visible = false;

            
            _ucMoveProductItemStatus.txtSN.Clear();
            _ucMoveProductItemStatus.txtSN.BackColor = Color.Yellow;

            _ucMoveProductItemStatus.search_process(_ucMoveProductItemStatus.txtSN.Text);
            this.ActiveControl = _ucMoveProductItemStatus.txtSN;
        }

    }
}
