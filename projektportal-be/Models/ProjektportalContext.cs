using Microsoft.EntityFrameworkCore;

namespace projektportal_be.Models;

public partial class ProjektportalContext : DbContext
{
    public IConfiguration Configuration { get; }

    public ProjektportalContext(
        IConfiguration configuration
    )
    {
        Configuration = configuration;
    }

    public ProjektportalContext(
        DbContextOptions<ProjektportalContext> options,
        IConfiguration configuration
    )
        : base(options)
    {
    }

    public virtual DbSet<MailboxLabel> MailboxLabel { get; set; }

    public virtual DbSet<Users> Users { get; set; }

    public virtual DbSet<Services> Services { get; set; }

    public virtual DbSet<MailboxOutgoing> MailboxOutgoing { get; set; }

    public virtual DbSet<Mailbox> Mailbox { get; set; }

    public virtual DbSet<SystemStatus> SystemStatus { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=projektportal;user=root;password=uoF3och6;treattinyasboolean=true", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.11.2-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<MailboxLabel>(entity =>
        {
            entity.HasKey(e => e.MailboxLabelId).HasName("PRIMARY");

            entity.ToTable("mailboxLabel");

            entity.HasIndex(e => e.MailboxLabelId, "fk_entityMailboxLabelId");


            entity.Property(e => e.MailboxLabelId)
                .HasMaxLength(36)
                .HasColumnName("mailboxLabelId");

            entity.Property(e => e.Name)
                .HasMaxLength(36)
                .HasColumnName("name");


            entity.HasMany(m => m.MailboxLabelMailboxNm)
                .WithOne(o => o.MailboxLabel)
                .OnDelete(DeleteBehavior.ClientNoAction)
                .HasConstraintName("mailboxLabel_ibfk_1");

        });

        modelBuilder.Entity<Users>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.UserId, "fk_entityUserId");


            entity.Property(e => e.UserId)
                .HasMaxLength(36)
                .HasColumnName("userId");

            entity.Property(e => e.Name)
                .HasMaxLength(36)
                .HasColumnName("name");

            entity.Property(e => e.Password)
                .HasMaxLength(36)
                .HasColumnName("password");

            entity.Property(e => e.Active)
                .HasMaxLength(36)
                .HasColumnName("active");


            entity.HasMany(m => m.UsersServicesNm)
                .WithOne(o => o.Users)
                .OnDelete(DeleteBehavior.ClientNoAction)
                .HasConstraintName("users_ibfk_1");

        });

        modelBuilder.Entity<Services>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PRIMARY");

            entity.ToTable("services");

            entity.HasIndex(e => e.ServiceId, "fk_entityServiceId");


            entity.Property(e => e.ServiceId)
                .HasMaxLength(36)
                .HasColumnName("serviceId");

            entity.Property(e => e.Active)
                .HasMaxLength(36)
                .HasColumnName("active");

            entity.Property(e => e.Name)
                .HasMaxLength(36)
                .HasColumnName("name");

            entity.Property(e => e.Url)
                .HasMaxLength(36)
                .HasColumnName("url");

            entity.Property(e => e.Module)
                .HasMaxLength(36)
                .HasColumnName("module");


            entity.HasMany(m => m.UsersServicesNm)
                .WithOne(o => o.Services)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("services_ibfk_1");

        });

        modelBuilder.Entity<MailboxOutgoing>(entity =>
        {
            entity.HasKey(e => e.MailboxOutgoingId).HasName("PRIMARY");

            entity.ToTable("mailboxOutgoing");

            entity.HasIndex(e => e.MailboxOutgoingId, "fk_entityMailboxOutgoingId");


            entity.Property(e => e.Status)
                .HasMaxLength(36)
                .HasColumnName("status");

            entity.Property(e => e.Files)
                .HasMaxLength(36)
                .HasColumnName("files");

            entity.Property(e => e.MailboxOutgoingId)
                .HasMaxLength(36)
                .HasColumnName("mailboxOutgoingId");

            entity.Property(e => e.Receiver)
                .HasMaxLength(36)
                .HasColumnName("receiver");

            entity.Property(e => e.Description)
                .HasMaxLength(36)
                .HasColumnName("description");

            entity.Property(e => e.Category)
                .HasMaxLength(36)
                .HasColumnName("category");

            entity.Property(e => e.Receipt)
                .HasMaxLength(36)
                .HasColumnName("receipt");

            entity.Property(e => e.Datum)
                .HasMaxLength(36)
                .HasColumnName("datum");


        });

        modelBuilder.Entity<Mailbox>(entity =>
        {
            entity.HasKey(e => e.MailboxId).HasName("PRIMARY");

            entity.ToTable("mailbox");

            entity.HasIndex(e => e.MailboxId, "fk_entityMailboxId");


            entity.Property(e => e.Status)
                .HasMaxLength(36)
                .HasColumnName("status");

            entity.Property(e => e.MailboxId)
                .HasMaxLength(36)
                .HasColumnName("mailboxId");

            entity.Property(e => e.Date)
                .HasMaxLength(36)
                .HasColumnName("date");

            entity.Property(e => e.SentBy)
                .HasMaxLength(36)
                .HasColumnName("sentBy");

            entity.Property(e => e.UserId)
                .HasMaxLength(36)
                .HasColumnName("userId");

            entity.Property(e => e.Ehp)
                .HasMaxLength(36)
                .HasColumnName("ehp");

            entity.Property(e => e.Description)
                .HasMaxLength(36)
                .HasColumnName("description");

            entity.Property(e => e.Files)
                .HasMaxLength(36)
                .HasColumnName("files");


            entity.HasMany(m => m.MailboxLabelMailboxNm)
                .WithOne(o => o.Mailbox)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("mailbox_ibfk_1");

        });

        modelBuilder.Entity<SystemStatus>(entity =>
        {
            entity.HasKey(e => e.SystemStatusId).HasName("PRIMARY");

            entity.ToTable("systemStatus");

            entity.HasIndex(e => e.SystemStatusId, "fk_entitySystemStatusId");


            entity.Property(e => e.Blocking)
                .HasMaxLength(36)
                .HasColumnName("blocking");

            entity.Property(e => e.ToDate)
                .HasMaxLength(36)
                .HasColumnName("toDate");

            entity.Property(e => e.SystemStatusId)
                .HasMaxLength(36)
                .HasColumnName("systemStatusId");

            entity.Property(e => e.FromDate)
                .HasMaxLength(36)
                .HasColumnName("fromDate");

            entity.Property(e => e.Name)
                .HasMaxLength(36)
                .HasColumnName("name");


        });

        modelBuilder.Entity<UsersServicesNm>(entity =>
        {
            entity.HasKey(e => e.UsersServicesId).HasName("PRIMARY");

            entity.ToTable("Users_Services_nm");

            entity.HasIndex(e => e.UserId, "userId");

            entity.HasIndex(e => e.ServiceId, "serviceId");

            entity.Property(e => e.UsersServicesId)
                .ValueGeneratedOnAdd()
                .HasColumnType("varchar(36)")
                .HasColumnName("Users_Services_id");
            entity.Property(e => e.UserId)
                .HasColumnType("varchar(36)")
                .HasColumnName("4604e9b0-abcb-4ed0-ae47-9cf692698e42");
            entity.Property(e => e.ServiceId)
                .HasColumnType("varchar(36)")
                .HasColumnName("serviceId");

            entity.HasOne(d => d.Users)
                .WithMany(p => p.UsersServicesNm)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("users_services_nm_ibfk_1");

            entity.HasOne(d => d.Services)
                .WithMany(p => p.UsersServicesNm)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("users_services_nm_ibfk_2");
        });
        modelBuilder.Entity<MailboxLabelMailboxNm>(entity =>
        {
            entity.HasKey(e => e.MailboxLabelMailboxId).HasName("PRIMARY");

            entity.ToTable("MailboxLabel_Mailbox_nm");

            entity.HasIndex(e => e.MailboxLabelId, "mailboxLabelId");

            entity.HasIndex(e => e.MailboxId, "mailboxId");

            entity.Property(e => e.MailboxLabelMailboxId)
                .ValueGeneratedOnAdd()
                .HasColumnType("varchar(36)")
                .HasColumnName("MailboxLabel_Mailbox_id");
            entity.Property(e => e.MailboxLabelId)
                .HasColumnType("varchar(36)")
                .HasColumnName("3a335eba-bf22-4465-9305-3ab1a61e60df");
            entity.Property(e => e.MailboxId)
                .HasColumnType("varchar(36)")
                .HasColumnName("mailboxId");

            entity.HasOne(d => d.MailboxLabel)
                .WithMany(p => p.MailboxLabelMailboxNm)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("mailboxLabel_mailbox_nm_ibfk_1");

            entity.HasOne(d => d.Mailbox)
                .WithMany(p => p.MailboxLabelMailboxNm)
                .HasForeignKey(d => d.MailboxId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("mailboxLabel_mailbox_nm_ibfk_2");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
