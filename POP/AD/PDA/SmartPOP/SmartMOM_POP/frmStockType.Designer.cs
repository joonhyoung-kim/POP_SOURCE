namespace SmartMOM_POP
{
    partial class frmStockType
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
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.btnMAT = new System.Windows.Forms.Button();
            this.btnConfirm = new System.Windows.Forms.Button();
            this.btnClose = new System.Windows.Forms.Button();
            this.btnWO = new System.Windows.Forms.Button();
            this.btnSO = new System.Windows.Forms.Button();
            this.btnMRTN = new System.Windows.Forms.Button();
            this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel1.ColumnCount = 2;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.Controls.Add(this.btnMAT, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.btnConfirm, 0, 2);
            this.tableLayoutPanel1.Controls.Add(this.btnClose, 1, 2);
            this.tableLayoutPanel1.Controls.Add(this.btnWO, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.btnSO, 1, 1);
            this.tableLayoutPanel1.Controls.Add(this.btnMRTN, 1, 0);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Margin = new System.Windows.Forms.Padding(1);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 3;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 165F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1300, 820);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // btnMAT
            // 
            this.btnMAT.BackColor = System.Drawing.Color.Silver;
            this.btnMAT.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnMAT.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnMAT.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnMAT.ForeColor = System.Drawing.Color.Black;
            this.btnMAT.Location = new System.Drawing.Point(1, 1);
            this.btnMAT.Margin = new System.Windows.Forms.Padding(0);
            this.btnMAT.Name = "btnMAT";
            this.btnMAT.Size = new System.Drawing.Size(648, 325);
            this.btnMAT.TabIndex = 5;
            this.btnMAT.Text = "재고이동";
            this.btnMAT.UseVisualStyleBackColor = false;
            this.btnMAT.Click += new System.EventHandler(this.btnMAT_Click);
            // 
            // btnConfirm
            // 
            this.btnConfirm.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnConfirm.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnConfirm.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnConfirm.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnConfirm.ForeColor = System.Drawing.Color.Black;
            this.btnConfirm.Location = new System.Drawing.Point(1, 653);
            this.btnConfirm.Margin = new System.Windows.Forms.Padding(0);
            this.btnConfirm.Name = "btnConfirm";
            this.btnConfirm.Size = new System.Drawing.Size(648, 166);
            this.btnConfirm.TabIndex = 5;
            this.btnConfirm.Text = "확 인";
            this.btnConfirm.UseVisualStyleBackColor = false;
            this.btnConfirm.Click += new System.EventHandler(this.btnConfirm_Click);
            // 
            // btnClose
            // 
            this.btnClose.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnClose.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnClose.ForeColor = System.Drawing.Color.Black;
            this.btnClose.Location = new System.Drawing.Point(650, 653);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(649, 166);
            this.btnClose.TabIndex = 5;
            this.btnClose.Text = "닫 기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // btnWO
            // 
            this.btnWO.BackColor = System.Drawing.Color.Silver;
            this.btnWO.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnWO.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnWO.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnWO.ForeColor = System.Drawing.Color.Black;
            this.btnWO.Location = new System.Drawing.Point(1, 327);
            this.btnWO.Margin = new System.Windows.Forms.Padding(0);
            this.btnWO.Name = "btnWO";
            this.btnWO.Size = new System.Drawing.Size(648, 325);
            this.btnWO.TabIndex = 5;
            this.btnWO.Text = "공정이동";
            this.btnWO.UseVisualStyleBackColor = false;
            this.btnWO.Click += new System.EventHandler(this.btnWO_Click);
            // 
            // btnSO
            // 
            this.btnSO.BackColor = System.Drawing.Color.Silver;
            this.btnSO.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnSO.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnSO.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnSO.ForeColor = System.Drawing.Color.Black;
            this.btnSO.Location = new System.Drawing.Point(650, 327);
            this.btnSO.Margin = new System.Windows.Forms.Padding(0);
            this.btnSO.Name = "btnSO";
            this.btnSO.Size = new System.Drawing.Size(649, 325);
            this.btnSO.TabIndex = 5;
            this.btnSO.Text = "제품이동";
            this.btnSO.UseVisualStyleBackColor = false;
            this.btnSO.Click += new System.EventHandler(this.btnSO_Click);
            // 
            // btnMRTN
            // 
            this.btnMRTN.BackColor = System.Drawing.Color.Silver;
            this.btnMRTN.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnMRTN.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnMRTN.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnMRTN.ForeColor = System.Drawing.Color.Black;
            this.btnMRTN.Location = new System.Drawing.Point(650, 1);
            this.btnMRTN.Margin = new System.Windows.Forms.Padding(0);
            this.btnMRTN.Name = "btnMRTN";
            this.btnMRTN.Size = new System.Drawing.Size(649, 325);
            this.btnMRTN.TabIndex = 5;
            this.btnMRTN.Text = "자재반납";
            this.btnMRTN.UseVisualStyleBackColor = false;
            this.btnMRTN.Click += new System.EventHandler(this.btnMRTN_Click);
            // 
            // frmStockType
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1300, 820);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmStockType";
            this.Text = "frmStockType";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.tableLayoutPanel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Button btnMAT;
        private System.Windows.Forms.Button btnConfirm;
        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.Button btnWO;
        private System.Windows.Forms.Button btnSO;
        private System.Windows.Forms.Button btnMRTN;
    }
}