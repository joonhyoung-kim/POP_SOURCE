using MetroFramework.Forms;
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
    public partial class frmLoginIDInsert : Form
    {
        string _initFlag = "Y";
        public frmLoginIDInsert()
        {
            InitializeComponent();

            clsStatic.Hotkey_Register(this);
        }

        public frmLoginIDInsert(string value)
        {
            InitializeComponent();

            clsStatic.Hotkey_Register(this);

            txtID.Text = value;
        }

        const int WM_HOTKEY = 0x0312;
        protected override void WndProc(ref Message message)
        {
            switch (message.Msg)
            {
                case WM_HOTKEY:
                    Keys key = (Keys)(((int)message.LParam >> 16) & 0xFFFF);

                    if (Keys.Escape == key)
                    {
                        clsStatic.UnHotkey_Register(this);
                        this.Close();
                    }
                    break;
            }
            base.WndProc(ref message);
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            clsStatic.UnHotkey_Register(this);
            this.Close();
        }

        private void btn_Click(object sender, EventArgs e)
        {
            string value = ((Button)sender).Text;

            if (_initFlag == "Y")
            {
                txtID.Text = value;
                _initFlag = "N";
            }
            else
            {
                txtID.Text += value;
            }
        }

        private void btnBack_Click(object sender, EventArgs e)
        {
            if(txtID.Text.Trim() == "")
            {
                return;
            }

            txtID.Text = txtID.Text.Substring(0, txtID.Text.Length - 1);
        }

        private void metroButton10_Click(object sender, EventArgs e)
        {
            if (txtID.Text.Trim() == "")
            {
                clsStatic.UnHotkey_Register(this);
                this.Close();
            }

            clsStatic._dialogValue = double.Parse(txtID.Text.Trim()).ToString();
            this.Close();
        }

        private void btnInit_Click(object sender, EventArgs e)
        {
            txtID.Text = "";
        }

        private void txtID_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (txtID.Text.Trim() == "")
                {
                    clsStatic.UnHotkey_Register(this);
                    this.Close();
                }

                clsStatic._dialogValue = double.Parse(txtID.Text.Trim()).ToString();
                clsStatic.UnHotkey_Register(this);
                this.Close();
            }
        }
    }
}
