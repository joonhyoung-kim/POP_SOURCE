using System.Windows.Forms;

namespace SmartMOM_POP
{
    partial class frmCommonStockSelect
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
            this.tableMain = new System.Windows.Forms.TableLayoutPanel();
            this.btnItemType = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.btnClose = new System.Windows.Forms.Button();
            this.btnLogin = new System.Windows.Forms.Button();
            this.btnTo = new System.Windows.Forms.Button();
            this.lblFrom = new System.Windows.Forms.Label();
            this.btnFrom = new System.Windows.Forms.Button();
            this.lblTo = new System.Windows.Forms.Label();
            this.lblItemType = new System.Windows.Forms.Label();
            this.tableMain.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableMain
            // 
            this.tableMain.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableMain.ColumnCount = 2;
            this.tableMain.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 300F));
            this.tableMain.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableMain.Controls.Add(this.btnItemType, 1, 2);
            this.tableMain.Controls.Add(this.panel1, 0, 3);
            this.tableMain.Controls.Add(this.btnTo, 1, 1);
            this.tableMain.Controls.Add(this.lblFrom, 0, 0);
            this.tableMain.Controls.Add(this.btnFrom, 1, 0);
            this.tableMain.Controls.Add(this.lblTo, 0, 1);
            this.tableMain.Controls.Add(this.lblItemType, 0, 2);
            this.tableMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableMain.Location = new System.Drawing.Point(0, 0);
            this.tableMain.Margin = new System.Windows.Forms.Padding(2);
            this.tableMain.Name = "tableMain";
            this.tableMain.RowCount = 4;
            this.tableMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.tableMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.tableMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.tableMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 114F));
            this.tableMain.Size = new System.Drawing.Size(Screen.PrimaryScreen.Bounds.Width, Screen.PrimaryScreen.Bounds.Height);
            this.tableMain.TabIndex = 1;
            // 
            // btnItemType
            // 
            this.btnItemType.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnItemType.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnItemType.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnItemType.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnItemType.ForeColor = System.Drawing.Color.Black;
            this.btnItemType.Location = new System.Drawing.Point(302, 605);
            this.btnItemType.Margin = new System.Windows.Forms.Padding(0);
            this.btnItemType.Name = "btnItemType";
            this.btnItemType.Size = new System.Drawing.Size(977, 301);
            this.btnItemType.TabIndex = 4;
            this.btnItemType.Text = "전체(ALL)";
            this.btnItemType.UseVisualStyleBackColor = false;
            this.btnItemType.Click += new System.EventHandler(this.btnItemType_Click);
            // 
            // panel1
            // 
            this.tableMain.SetColumnSpan(this.panel1, 2);
            this.panel1.Controls.Add(this.btnClose);
            this.panel1.Controls.Add(this.btnLogin);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(2, 907);
            this.panel1.Margin = new System.Windows.Forms.Padding(1, 0, 1, 1);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1276, 115);
            this.panel1.TabIndex = 4;
            // 
            // btnClose
            // 
            this.btnClose.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnClose.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnClose.ForeColor = System.Drawing.Color.Black;
            this.btnClose.Location = new System.Drawing.Point(724, 7);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(545, 102);
            this.btnClose.TabIndex = 4;
            this.btnClose.Text = "닫 기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // btnLogin
            // 
            this.btnLogin.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnLogin.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnLogin.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnLogin.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnLogin.ForeColor = System.Drawing.Color.Black;
            this.btnLogin.Location = new System.Drawing.Point(171, 8);
            this.btnLogin.Margin = new System.Windows.Forms.Padding(0);
            this.btnLogin.Name = "btnLogin";
            this.btnLogin.Size = new System.Drawing.Size(544, 101);
            this.btnLogin.TabIndex = 4;
            this.btnLogin.Text = "확 인";
            this.btnLogin.UseVisualStyleBackColor = false;
            this.btnLogin.Click += new System.EventHandler(this.btnLogin_Click);
            // 
            // btnTo
            // 
            this.btnTo.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnTo.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnTo.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnTo.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnTo.ForeColor = System.Drawing.Color.Black;
            this.btnTo.Location = new System.Drawing.Point(302, 303);
            this.btnTo.Margin = new System.Windows.Forms.Padding(0);
            this.btnTo.Name = "btnTo";
            this.btnTo.Size = new System.Drawing.Size(977, 301);
            this.btnTo.TabIndex = 4;
            this.btnTo.Text = "NODATA";
            this.btnTo.UseVisualStyleBackColor = false;
            this.btnTo.Click += new System.EventHandler(this.btnTo_Click);
            // 
            // lblFrom
            // 
            this.lblFrom.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblFrom.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblFrom.Location = new System.Drawing.Point(2, 2);
            this.lblFrom.Margin = new System.Windows.Forms.Padding(1);
            this.lblFrom.Name = "lblFrom";
            this.lblFrom.Size = new System.Drawing.Size(298, 299);
            this.lblFrom.TabIndex = 12;
            this.lblFrom.Text = "From";
            this.lblFrom.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // btnFrom
            // 
            this.btnFrom.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnFrom.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnFrom.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnFrom.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnFrom.ForeColor = System.Drawing.Color.Black;
            this.btnFrom.Location = new System.Drawing.Point(302, 1);
            this.btnFrom.Margin = new System.Windows.Forms.Padding(0);
            this.btnFrom.Name = "btnFrom";
            this.btnFrom.Size = new System.Drawing.Size(977, 301);
            this.btnFrom.TabIndex = 4;
            this.btnFrom.Text = "NODATA";
            this.btnFrom.UseVisualStyleBackColor = false;
            this.btnFrom.Click += new System.EventHandler(this.btnFrom_Click);
            // 
            // lblTo
            // 
            this.lblTo.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblTo.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblTo.Location = new System.Drawing.Point(2, 304);
            this.lblTo.Margin = new System.Windows.Forms.Padding(1);
            this.lblTo.Name = "lblTo";
            this.lblTo.Size = new System.Drawing.Size(298, 299);
            this.lblTo.TabIndex = 12;
            this.lblTo.Text = "To";
            this.lblTo.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblItemType
            // 
            this.lblItemType.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblItemType.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblItemType.Location = new System.Drawing.Point(2, 606);
            this.lblItemType.Margin = new System.Windows.Forms.Padding(1);
            this.lblItemType.Name = "lblItemType";
            this.lblItemType.Size = new System.Drawing.Size(298, 299);
            this.lblItemType.TabIndex = 12;
            this.lblItemType.Text = "품목유형";
            this.lblItemType.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // frmCommonStockSelect
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(Screen.PrimaryScreen.Bounds.Width, Screen.PrimaryScreen.Bounds.Height);
            this.Controls.Add(this.tableMain);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmCommonStockSelect";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "공정이동";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.tableMain.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableMain;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label lblFrom;
        private System.Windows.Forms.Label lblTo;
        private System.Windows.Forms.Label lblItemType;
        private System.Windows.Forms.Button btnFrom;
        private System.Windows.Forms.Button btnItemType;
        private System.Windows.Forms.Button btnTo;
        private System.Windows.Forms.Button btnLogin;
        private System.Windows.Forms.Button btnClose;
    }
}