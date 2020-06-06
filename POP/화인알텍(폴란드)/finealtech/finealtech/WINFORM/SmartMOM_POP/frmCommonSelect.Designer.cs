namespace SmartMOM_POP
{
    partial class frmCommonSelect
    {
        /// <summary>
        /// 필수 디자이너 변수입니다.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 사용 중인 모든 리소스를 정리합니다.
        /// </summary>
        /// <param name="disposing">관리되는 리소스를 삭제해야 하면 true이고, 그렇지 않으면 false입니다.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form 디자이너에서 생성한 코드

        /// <summary>
        /// 디자이너 지원에 필요한 메서드입니다. 
        /// 이 메서드의 내용을 코드 편집기로 수정하지 마세요.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnPrintConfig = new System.Windows.Forms.Button();
            this.btnLabelDesign = new System.Windows.Forms.Button();
            this.btnClose = new System.Windows.Forms.Button();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.label1 = new System.Windows.Forms.Label();
            this.lblTitle = new System.Windows.Forms.Label();
            this.btnBody01 = new System.Windows.Forms.Button();
            this.btnBody04 = new System.Windows.Forms.Button();
            this.btnBody02 = new System.Windows.Forms.Button();
            this.btnBody03 = new System.Windows.Forms.Button();
            this.btnBody06 = new System.Windows.Forms.Button();
            this.btnBody05 = new System.Windows.Forms.Button();
            this.btnNext = new System.Windows.Forms.Button();
            this.btnPrev = new System.Windows.Forms.Button();
            this.btnBody07 = new System.Windows.Forms.Button();
            this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // btnPrintConfig
            // 
            this.btnPrintConfig.BackColor = System.Drawing.Color.MediumBlue;
            this.btnPrintConfig.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnPrintConfig.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnPrintConfig.ForeColor = System.Drawing.Color.White;
            this.btnPrintConfig.Location = new System.Drawing.Point(768, 330);
            this.btnPrintConfig.Margin = new System.Windows.Forms.Padding(2);
            this.btnPrintConfig.Name = "btnPrintConfig";
            this.btnPrintConfig.Size = new System.Drawing.Size(253, 214);
            this.btnPrintConfig.TabIndex = 0;
            this.btnPrintConfig.Text = "프린터 설정";
            this.btnPrintConfig.UseVisualStyleBackColor = false;
            this.btnPrintConfig.Click += new System.EventHandler(this.btnPrintConfig_Click);
            // 
            // btnLabelDesign
            // 
            this.btnLabelDesign.BackColor = System.Drawing.Color.MediumBlue;
            this.btnLabelDesign.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnLabelDesign.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnLabelDesign.ForeColor = System.Drawing.Color.White;
            this.btnLabelDesign.Location = new System.Drawing.Point(768, 111);
            this.btnLabelDesign.Margin = new System.Windows.Forms.Padding(2);
            this.btnLabelDesign.Name = "btnLabelDesign";
            this.btnLabelDesign.Size = new System.Drawing.Size(253, 214);
            this.btnLabelDesign.TabIndex = 0;
            this.btnLabelDesign.Text = "라벨디자이너";
            this.btnLabelDesign.UseVisualStyleBackColor = false;
            this.btnLabelDesign.Click += new System.EventHandler(this.btnLabelDesign_Click);
            // 
            // btnClose
            // 
            this.btnClose.BackColor = System.Drawing.Color.MediumBlue;
            this.btnClose.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnClose.ForeColor = System.Drawing.Color.White;
            this.btnClose.Location = new System.Drawing.Point(768, 549);
            this.btnClose.Margin = new System.Windows.Forms.Padding(2);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(253, 216);
            this.btnClose.TabIndex = 0;
            this.btnClose.Text = "닫 기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel1.ColumnCount = 4;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25F));
            this.tableLayoutPanel1.Controls.Add(this.btnClose, 3, 3);
            this.tableLayoutPanel1.Controls.Add(this.label1, 3, 0);
            this.tableLayoutPanel1.Controls.Add(this.lblTitle, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.btnLabelDesign, 3, 1);
            this.tableLayoutPanel1.Controls.Add(this.btnPrintConfig, 3, 2);
            this.tableLayoutPanel1.Controls.Add(this.btnBody01, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.btnBody04, 0, 2);
            this.tableLayoutPanel1.Controls.Add(this.btnBody02, 1, 1);
            this.tableLayoutPanel1.Controls.Add(this.btnBody03, 2, 1);
            this.tableLayoutPanel1.Controls.Add(this.btnBody06, 2, 2);
            this.tableLayoutPanel1.Controls.Add(this.btnBody05, 1, 2);
            this.tableLayoutPanel1.Controls.Add(this.btnNext, 2, 3);
            this.tableLayoutPanel1.Controls.Add(this.btnPrev, 1, 3);
            this.tableLayoutPanel1.Controls.Add(this.btnBody07, 0, 3);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 4;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 107F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 33.33334F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 33.33334F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 33.33332F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1024, 768);
            this.tableLayoutPanel1.TabIndex = 1;
            // 
            // label1
            // 
            this.label1.BackColor = System.Drawing.Color.Black;
            this.label1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label1.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label1.ForeColor = System.Drawing.Color.White;
            this.label1.Location = new System.Drawing.Point(767, 2);
            this.label1.Margin = new System.Windows.Forms.Padding(1);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(255, 105);
            this.label1.TabIndex = 1;
            this.label1.Text = "환경설정";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblTitle
            // 
            this.lblTitle.BackColor = System.Drawing.Color.Black;
            this.tableLayoutPanel1.SetColumnSpan(this.lblTitle, 3);
            this.lblTitle.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblTitle.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblTitle.ForeColor = System.Drawing.Color.White;
            this.lblTitle.Location = new System.Drawing.Point(2, 2);
            this.lblTitle.Margin = new System.Windows.Forms.Padding(1);
            this.lblTitle.Name = "lblTitle";
            this.lblTitle.Size = new System.Drawing.Size(762, 105);
            this.lblTitle.TabIndex = 1;
            this.lblTitle.Text = "생산관리";
            this.lblTitle.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnBody01
            // 
            this.btnBody01.BackColor = System.Drawing.Color.WhiteSmoke;
            this.btnBody01.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnBody01.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnBody01.Location = new System.Drawing.Point(3, 111);
            this.btnBody01.Margin = new System.Windows.Forms.Padding(2);
            this.btnBody01.Name = "btnBody01";
            this.btnBody01.Size = new System.Drawing.Size(250, 214);
            this.btnBody01.TabIndex = 0;
            this.btnBody01.Text = "btnBody01";
            this.btnBody01.UseVisualStyleBackColor = false;
            this.btnBody01.Click += new System.EventHandler(this.btnBody_Click);
            // 
            // btnBody04
            // 
            this.btnBody04.BackColor = System.Drawing.Color.WhiteSmoke;
            this.btnBody04.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnBody04.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnBody04.Location = new System.Drawing.Point(3, 330);
            this.btnBody04.Margin = new System.Windows.Forms.Padding(2);
            this.btnBody04.Name = "btnBody04";
            this.btnBody04.Size = new System.Drawing.Size(250, 214);
            this.btnBody04.TabIndex = 0;
            this.btnBody04.Text = "btnBody04";
            this.btnBody04.UseVisualStyleBackColor = false;
            this.btnBody04.Click += new System.EventHandler(this.btnBody_Click);
            // 
            // btnBody02
            // 
            this.btnBody02.BackColor = System.Drawing.Color.WhiteSmoke;
            this.btnBody02.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnBody02.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnBody02.Location = new System.Drawing.Point(258, 111);
            this.btnBody02.Margin = new System.Windows.Forms.Padding(2);
            this.btnBody02.Name = "btnBody02";
            this.btnBody02.Size = new System.Drawing.Size(250, 214);
            this.btnBody02.TabIndex = 0;
            this.btnBody02.Text = "btnBody02";
            this.btnBody02.UseVisualStyleBackColor = false;
            this.btnBody02.Click += new System.EventHandler(this.btnBody_Click);
            // 
            // btnBody03
            // 
            this.btnBody03.BackColor = System.Drawing.Color.WhiteSmoke;
            this.btnBody03.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnBody03.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnBody03.Location = new System.Drawing.Point(513, 111);
            this.btnBody03.Margin = new System.Windows.Forms.Padding(2);
            this.btnBody03.Name = "btnBody03";
            this.btnBody03.Size = new System.Drawing.Size(250, 214);
            this.btnBody03.TabIndex = 0;
            this.btnBody03.Text = "btnBody03";
            this.btnBody03.UseVisualStyleBackColor = false;
            this.btnBody03.Click += new System.EventHandler(this.btnBody_Click);
            // 
            // btnBody06
            // 
            this.btnBody06.BackColor = System.Drawing.Color.WhiteSmoke;
            this.btnBody06.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnBody06.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnBody06.Location = new System.Drawing.Point(513, 330);
            this.btnBody06.Margin = new System.Windows.Forms.Padding(2);
            this.btnBody06.Name = "btnBody06";
            this.btnBody06.Size = new System.Drawing.Size(250, 214);
            this.btnBody06.TabIndex = 0;
            this.btnBody06.Text = "btnBody06";
            this.btnBody06.UseVisualStyleBackColor = false;
            this.btnBody06.Click += new System.EventHandler(this.btnBody_Click);
            // 
            // btnBody05
            // 
            this.btnBody05.BackColor = System.Drawing.Color.WhiteSmoke;
            this.btnBody05.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnBody05.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnBody05.Location = new System.Drawing.Point(258, 330);
            this.btnBody05.Margin = new System.Windows.Forms.Padding(2);
            this.btnBody05.Name = "btnBody05";
            this.btnBody05.Size = new System.Drawing.Size(250, 214);
            this.btnBody05.TabIndex = 0;
            this.btnBody05.Text = "btnBody05";
            this.btnBody05.UseVisualStyleBackColor = false;
            this.btnBody05.Click += new System.EventHandler(this.btnBody_Click);
            // 
            // btnNext
            // 
            this.btnNext.BackColor = System.Drawing.Color.MediumBlue;
            this.btnNext.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnNext.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnNext.ForeColor = System.Drawing.Color.White;
            this.btnNext.Location = new System.Drawing.Point(513, 549);
            this.btnNext.Margin = new System.Windows.Forms.Padding(2);
            this.btnNext.Name = "btnNext";
            this.btnNext.Size = new System.Drawing.Size(250, 216);
            this.btnNext.TabIndex = 0;
            this.btnNext.Text = "▼";
            this.btnNext.UseVisualStyleBackColor = false;
            this.btnNext.Click += new System.EventHandler(this.btnNext_Click);
            // 
            // btnPrev
            // 
            this.btnPrev.BackColor = System.Drawing.Color.MediumBlue;
            this.btnPrev.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnPrev.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnPrev.ForeColor = System.Drawing.Color.White;
            this.btnPrev.Location = new System.Drawing.Point(258, 549);
            this.btnPrev.Margin = new System.Windows.Forms.Padding(2);
            this.btnPrev.Name = "btnPrev";
            this.btnPrev.Size = new System.Drawing.Size(250, 216);
            this.btnPrev.TabIndex = 0;
            this.btnPrev.Text = "▲";
            this.btnPrev.UseVisualStyleBackColor = false;
            this.btnPrev.Click += new System.EventHandler(this.btnPrev_Click);
            // 
            // btnBody07
            // 
            this.btnBody07.BackColor = System.Drawing.Color.WhiteSmoke;
            this.btnBody07.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnBody07.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnBody07.Location = new System.Drawing.Point(3, 549);
            this.btnBody07.Margin = new System.Windows.Forms.Padding(2);
            this.btnBody07.Name = "btnBody07";
            this.btnBody07.Size = new System.Drawing.Size(250, 216);
            this.btnBody07.TabIndex = 0;
            this.btnBody07.Text = "btnBody07";
            this.btnBody07.UseVisualStyleBackColor = false;
            this.btnBody07.Click += new System.EventHandler(this.btnBody_Click);
            // 
            // frmCommonSelect
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1024, 768);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "frmCommonSelect";
            this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide;
            this.Text = "라인선택";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.tableLayoutPanel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnPrintConfig;
        private System.Windows.Forms.Button btnLabelDesign;
        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label lblTitle;
        private System.Windows.Forms.Button btnBody01;
        private System.Windows.Forms.Button btnBody04;
        private System.Windows.Forms.Button btnBody02;
        private System.Windows.Forms.Button btnBody03;
        private System.Windows.Forms.Button btnBody06;
        private System.Windows.Forms.Button btnBody05;
        private System.Windows.Forms.Button btnPrev;
        private System.Windows.Forms.Button btnNext;
        private System.Windows.Forms.Button btnBody07;
    }
}

