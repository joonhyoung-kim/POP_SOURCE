using MetroFramework.Forms;
using MetroFramework.Controls;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMom_Lib
{
    public partial class frmMessage : Form
    {
        DialogResult _resultValue1 = DialogResult.OK;
        DialogResult _resultValue2 = DialogResult.Cancel;
        public frmMessage(string message, string type)
        {
            InitializeComponent();

            if(type == "OK")
            {
                btnValue1.Visible = false;
                btnValue2.Text = "OK";
                _resultValue2 = DialogResult.OK;
            }
            else if(type == "AUTOCLOSE")
            {
                timerClose.Enabled = true;
                btnValue1.Visible = false;
                btnValue2.Text = "OK";
                _resultValue2 = DialogResult.OK;
            }

            lblMessage.Text = message;
        }

        public frmMessage(string message, string type, int sec)
        {
            InitializeComponent();

            if (type == "AUTOCLOSE")
            {
                timerClose.Interval = sec * 1000;
                timerClose.Enabled = true;
                btnValue1.Visible = false;
                btnValue2.Text = "OK";
                _resultValue2 = DialogResult.OK;
                lblMessage.Font = new Font("맑은고딕", 72F, FontStyle.Bold);
                lblMessage.TextAlign = ContentAlignment.MiddleCenter;
            }

            lblMessage.Text = message;
        }

        private void btnValue1_Click(object sender, EventArgs e)
        {
            this.DialogResult = _resultValue1;
            this.Close();
        }

        private void btnValue2_Click(object sender, EventArgs e)
        {
            this.DialogResult = _resultValue2;
            this.Close();
        }

        private void timerClose_Tick(object sender, EventArgs e)
        {
            timerClose.Enabled = false;

            this.Close();
        }

        private void panel1_Paint(object sender, PaintEventArgs e)
        {

        }
    }
}
