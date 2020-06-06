using MetroFramework.Controls;

namespace SmartMOM_POP
{
    partial class frmWOMessage
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
            this.tblMain = new System.Windows.Forms.TableLayoutPanel();
            this.btnValue3 = new System.Windows.Forms.Button();
            this.btnValue1 = new System.Windows.Forms.Button();
            this.btnValue2 = new System.Windows.Forms.Button();
            this.timerWarning = new System.Windows.Forms.Timer(this.components);
            this.panel1.SuspendLayout();
            this.tblMain.SuspendLayout();
            this.SuspendLayout();
            // 
            // lblMessage
            // 
            this.tblMain.SetColumnSpan(this.lblMessage, 5);
            this.lblMessage.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblMessage.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblMessage.Location = new System.Drawing.Point(1, 1);
            this.lblMessage.Margin = new System.Windows.Forms.Padding(1);
            this.lblMessage.Name = "lblMessage";
            this.lblMessage.Size = new System.Drawing.Size(1696, 266);
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
            this.panel1.Controls.Add(this.tblMain);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Margin = new System.Windows.Forms.Padding(0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1700, 387);
            this.panel1.TabIndex = 6;
            // 
            // tblMain
            // 
            this.tblMain.ColumnCount = 5;
            this.tblMain.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tblMain.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tblMain.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tblMain.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tblMain.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tblMain.Controls.Add(this.lblMessage, 0, 0);
            this.tblMain.Controls.Add(this.btnValue3, 4, 1);
            this.tblMain.Controls.Add(this.btnValue1, 2, 1);
            this.tblMain.Controls.Add(this.btnValue2, 3, 1);
            this.tblMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tblMain.Location = new System.Drawing.Point(0, 0);
            this.tblMain.Name = "tblMain";
            this.tblMain.RowCount = 2;
            this.tblMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tblMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 117F));
            this.tblMain.Size = new System.Drawing.Size(1698, 385);
            this.tblMain.TabIndex = 8;
            // 
            // btnValue3
            // 
            this.btnValue3.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnValue3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnValue3.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnValue3.Font = new System.Drawing.Font("맑은 고딕", 39.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnValue3.Location = new System.Drawing.Point(1359, 271);
            this.btnValue3.Name = "btnValue3";
            this.btnValue3.Size = new System.Drawing.Size(336, 111);
            this.btnValue3.TabIndex = 7;
            this.btnValue3.Text = "Value3";
            this.btnValue3.UseVisualStyleBackColor = false;
            this.btnValue3.Visible = false;
            this.btnValue3.Click += new System.EventHandler(this.btnValue3_Click);
            // 
            // btnValue1
            // 
            this.btnValue1.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnValue1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnValue1.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnValue1.Font = new System.Drawing.Font("맑은 고딕", 39.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnValue1.Location = new System.Drawing.Point(681, 271);
            this.btnValue1.Name = "btnValue1";
            this.btnValue1.Size = new System.Drawing.Size(333, 111);
            this.btnValue1.TabIndex = 7;
            this.btnValue1.Text = "Value1";
            this.btnValue1.UseVisualStyleBackColor = false;
            this.btnValue1.Visible = false;
            this.btnValue1.Click += new System.EventHandler(this.btnValue1_Click);
            // 
            // btnValue2
            // 
            this.btnValue2.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnValue2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnValue2.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnValue2.Font = new System.Drawing.Font("맑은 고딕", 39.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnValue2.Location = new System.Drawing.Point(1020, 271);
            this.btnValue2.Name = "btnValue2";
            this.btnValue2.Size = new System.Drawing.Size(333, 111);
            this.btnValue2.TabIndex = 7;
            this.btnValue2.Text = "Value2";
            this.btnValue2.UseVisualStyleBackColor = false;
            this.btnValue2.Visible = false;
            this.btnValue2.Click += new System.EventHandler(this.btnValue2_Click);
            // 
            // timerWarning
            // 
            this.timerWarning.Interval = 1000;
            this.timerWarning.Tick += new System.EventHandler(this.timerWarning_Tick);
            // 
            // frmWOMessage
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1700, 387);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.HelpButton = true;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "frmWOMessage";
            this.ShowIcon = false;
            this.ShowInTaskbar = false;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "SmartMOM Message";
            this.panel1.ResumeLayout(false);
            this.tblMain.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label lblMessage;
        private System.Windows.Forms.Timer timerClose;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button btnValue2;
        private System.Windows.Forms.Button btnValue1;
        private System.Windows.Forms.Button btnValue3;
        private System.Windows.Forms.TableLayoutPanel tblMain;
        private System.Windows.Forms.Timer timerWarning;
    }
}