using MetroFramework.Controls;

namespace SmartMom_Lib
{
    partial class frmMessage
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.lblMessage = new System.Windows.Forms.Label();
            this.timerClose = new System.Windows.Forms.Timer(this.components);
            this.panel1 = new System.Windows.Forms.Panel();
            this.btnValue2 = new System.Windows.Forms.Button();
            this.btnValue1 = new System.Windows.Forms.Button();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // lblMessage
            // 
            this.lblMessage.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblMessage.Location = new System.Drawing.Point(9, 9);
            this.lblMessage.Margin = new System.Windows.Forms.Padding(1);
            this.lblMessage.Name = "lblMessage";
            this.lblMessage.Size = new System.Drawing.Size(1260, 233);
            this.lblMessage.TabIndex = 0;
            this.lblMessage.Text = "message";
            this.lblMessage.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // timerClose
            // 
            this.timerClose.Interval = 4000;
            this.timerClose.Tick += new System.EventHandler(this.timerClose_Tick);
            // 
            // panel1
            // 
            this.panel1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panel1.Controls.Add(this.btnValue2);
            this.panel1.Controls.Add(this.lblMessage);
            this.panel1.Controls.Add(this.btnValue1);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Margin = new System.Windows.Forms.Padding(0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1280, 387);
            this.panel1.TabIndex = 6;
            // 
            // btnValue2
            // 
            this.btnValue2.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnValue2.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnValue2.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnValue2.Location = new System.Drawing.Point(990, 268);
            this.btnValue2.Name = "btnValue2";
            this.btnValue2.Size = new System.Drawing.Size(285, 114);
            this.btnValue2.TabIndex = 7;
            this.btnValue2.Text = "NO";
            this.btnValue2.UseVisualStyleBackColor = false;
            this.btnValue2.Click += new System.EventHandler(this.btnValue2_Click);
            // 
            // btnValue1
            // 
            this.btnValue1.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnValue1.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnValue1.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnValue1.Location = new System.Drawing.Point(699, 268);
            this.btnValue1.Name = "btnValue1";
            this.btnValue1.Size = new System.Drawing.Size(285, 114);
            this.btnValue1.TabIndex = 7;
            this.btnValue1.Text = "YES";
            this.btnValue1.UseVisualStyleBackColor = false;
            this.btnValue1.Click += new System.EventHandler(this.btnValue1_Click);
            // 
            // frmMessage
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1280, 387);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.HelpButton = true;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "frmMessage";
            this.ShowIcon = false;
            this.ShowInTaskbar = false;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "SmartMOM Message";
            this.panel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label lblMessage;
        private System.Windows.Forms.Timer timerClose;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button btnValue2;
        private System.Windows.Forms.Button btnValue1;
    }
}