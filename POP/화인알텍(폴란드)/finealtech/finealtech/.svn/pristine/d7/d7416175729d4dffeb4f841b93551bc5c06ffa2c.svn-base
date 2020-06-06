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
    public partial class frmLEDLot : Form
    {
        string incttype = "";

        public frmLEDLot()
        {
            InitializeComponent();
        }

        public frmLEDLot(string cttype)
        {
            incttype = cttype;
            InitializeComponent();

            if (incttype.Equals("DG-B02"))
            {
                txtSN.Text = "-";
                txtSN.Enabled = false;
                txtSN2.Enabled = true;
            } else if (incttype.Equals("DG-B01"))
            {
                txtSN.Enabled = true;
                txtSN2.Enabled = true;
            } else
            {
                this.Close();
            }
        }

        private void btnConfirm_Click(object sender, EventArgs e)
        {
            if (incttype.Equals("DG-B02"))
            {
                if (txtSN2.Text != "")
                {
                    clsStatic._dialogValue = txtSN.Text + "/" + txtSN2.Text;
                    this.Close();
                } else
                {
                    //frmMessage frm1 = new frmMessage("PRESS No.를 입력하세요.", "AUTOCLOSE");
                    frmMessage frm1 = new frmMessage("Please enter PRESS No.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }
            } else if (incttype.Equals("DG-B01"))
            {
                if (txtSN.Text != "" && txtSN2.Text != "")
                {
                    clsStatic._dialogValue = txtSN.Text + "/" + txtSN2.Text;
                    this.Close();
                } else
                {
                    if (txtSN.Text == "")
                    {
                        //frmMessage frm1 = new frmMessage("LED LOT No.를 입력하세요.", "AUTOCLOSE");
                        frmMessage frm1 = new frmMessage("Please enter LED LOT No.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        return;
                    }
                    else if (txtSN2.Text == "")
                    {
                        //frmMessage frm1 = new frmMessage("PRESS No.를 입력하세요.", "AUTOCLOSE");
                        frmMessage frm1 = new frmMessage("Please enter PRESS No.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        return;
                    }
                }
            }
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";
            this.Close();
        }
    }
}
