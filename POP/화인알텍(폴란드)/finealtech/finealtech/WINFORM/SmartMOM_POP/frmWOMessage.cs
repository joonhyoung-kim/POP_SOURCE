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
using SmartMom_Lib;

namespace SmartMOM_POP
{
    public partial class frmWOMessage : Form
    {
        string _value1 = "";
        string _value2 = "";
        string _value3 = "";

        public frmWOMessage(string message, string type, string btnText1, string btnText2, string btnText3, string value1, string value2, string value3)
        {
            InitializeComponent();

            this.WindowState = FormWindowState.Maximized;
            lblMessage.Text = message;
            tblMain.BackColor = Color.Red;
            lblMessage.ForeColor = Color.Yellow;
            lblMessage.Font = new Font("맑은고딕", 70F, FontStyle.Bold);

            if (btnText1 != "")
            {
                btnValue1.Text = btnText1;
                btnValue1.Visible = true;
            }
            if (btnText2 != "")
            {
                btnValue2.Text = btnText2;
                btnValue2.Visible = true;
            }
            if (btnText3 != "")
            {
                btnValue3.Text = btnText3;
                btnValue3.Visible = true;
            }

            _value1 = value1;
            _value2 = value2;
            _value3 = value3;

            if (type == "OK")
            {
                btnValue3.Visible = true;
                btnValue3.Text = "OK";
            }
            else if(type == "AUTOCLOSE")
            {
                btnValue3.Visible = true;
                timerClose.Enabled = true;
                btnValue3.Text = "OK";
            }

            lblMessage.Text = message;
            timerWarning.Enabled = true;
        }

        public frmWOMessage(string message, int interval)
        {
            InitializeComponent();

            this.WindowState = FormWindowState.Maximized;
            lblMessage.Text = message;
            tblMain.BackColor = Color.Red;
            lblMessage.ForeColor = Color.Yellow;
            lblMessage.Font = new Font("맑은고딕", 70F, FontStyle.Bold);

            btnValue3.Visible = true;
            btnValue3.Text = "OK";
            lblMessage.Text = message;

            if(interval > 0)
            {
                timerClose.Interval = interval * 1000;
            }
            timerWarning.Enabled = true;
            timerClose.Enabled = true;
        }

        private void btnValue1_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = _value1;
            this.Close();
        }

        private void btnValue2_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = _value2;
            this.Close();
        }

        private void btnValue3_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = _value3;
            this.Close();
        }

        private void timerClose_Tick(object sender, EventArgs e)
        {
            timerClose.Enabled = false;

            this.Close();
        }

        private void timerWarning_Tick(object sender, EventArgs e)
        {
            if(tblMain.BackColor == Color.Yellow)
            {
                tblMain.BackColor = Color.Red;
                lblMessage.ForeColor = Color.Yellow;
            }
            else
            {
                tblMain.BackColor = Color.Yellow;
                lblMessage.ForeColor = Color.Red;
            }
        }
    }
}
