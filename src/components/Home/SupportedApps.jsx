import { Box, Container, Typography, Stack, Link } from "@mui/material";

const apps = [
  {
    name: "Authy",
    href: "https://play.google.com/store/apps/details?id=com.authy.authy&hl=en_IN",
    icon: "https://play-lh.googleusercontent.com/zSwzBRRZ2ZRStFCCeDUnlcvdy8lhzwp6268PPQ1pgzEDDs70rzs7QjPBP7qnkD3X9s4IJMIA6nEZOHcd7PI-zg=w240-h480-rw",
  },
  {
    name: "Google Authenticator",
    href: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_IN",
    icon: "https://play-lh.googleusercontent.com/NntMALIH4odanPPYSqUOXsX8zy_giiK2olJiqkcxwFIOOspVrhMi9Miv6LYdRnKIg-3R=w240-h480-rw",
  },
  {
    name: "Microsoft Authenticator",
    href: "https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=en_IN",
    icon: "https://play-lh.googleusercontent.com/_1CV99jklLbXuun-6E7eCPR-sKKeZc602rhw_QHZz-qm7xrPdgWsJVc7NtFkkliI8No=w240-h480-rw",
  },
  {
    name: "2FAS",
    href: "https://apps.apple.com/us/app/2fa-authenticator-2fas/id1217793794",
    icon: "https://play-lh.googleusercontent.com/MFWba8AFyEqcXUmctYq3BV8gsTnw5V5PkQPiAtlUGhYSzMKK7NTT8mnmHFemapsXycAFnQPv-NjcL6Vs9V2n=w240-h480-rw",
  },
];

const SupportedApps = () => {
  return (
    <Box sx={{ py: { xs: 7, md: 9 }, backgroundColor: "#FBFAFF" }}>
      <Container maxWidth="md">
        <Stack spacing={1.5} sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="overline"
            sx={{
              color: "secondary.dark",
              fontWeight: 800,
              letterSpacing: 1.5,
            }}
          >
            Bring your own authenticator
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" } }}
          >
            Works with the app you already have
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 560, mx: "auto" }}
          >
            The 2FA flow generates a standard TOTP QR code, so any of these
            authenticator apps can scan it and start generating codes.
          </Typography>
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          spacing={{ xs: 2, sm: 3 }}
          useFlexGap
        >
          {apps.map((app) => (
            <Link
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                p: 2.5,
                width: 150,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                color: "text.primary",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 24px rgba(79, 70, 229, 0.12)",
                },
              }}
            >
              <Box
                component="img"
                src={app.icon}
                alt={app.name}
                sx={{ width: 44, height: 44, borderRadius: "10px" }}
              />
              <Typography variant="body2" fontWeight={700} textAlign="center">
                {app.name}
              </Typography>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default SupportedApps;
